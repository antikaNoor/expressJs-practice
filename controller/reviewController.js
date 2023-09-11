const bookModel = require('../model/book')
const readerModel = require('../model/reader')
const reviewModel = require('../model/review')
const { success, failure } = require('../utils/success-error')
const express = require('express')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

class reviewClass {
    //add data
    async add(req, res) {
        try {
            const { book, reader, rating, text } = req.body

            let existingBook = await bookModel.findById(new mongoose.Types.ObjectId(book))
            let existingReader = await readerModel.findById(new mongoose.Types.ObjectId(reader))
            const existingReview = await reviewModel.findOne({ book, reader })

            if (existingReview) {
                return res.status(400).send(failure("You have already given a review for this book"))
            }
            if ((!existingBook && !existingReader) || (!existingBook && existingReader) || (existingBook && !existingReader)) {
                return res.status(500).send(failure("Please provide a valid book or/and reader id."))
            }
            else {
                const review = new reviewModel({ book, reader, rating, text })

                await review.save()
                // Update the book's rating and get the new average rating
                const reviews = await reviewModel.find({ book });
                let totalRating = 0;

                for (const rev of reviews) {
                    totalRating += rev.rating;
                }

                const averageRating = totalRating / reviews.length

                // Update the book's rating
                await bookModel.findByIdAndUpdate(book, {
                    rating: averageRating,
                    $push: { reviews: review._id } // Add the review ID to the reviews array
                });

                console.log(`Average rating updated for book ${book} to ${averageRating}`)

                return res.status(200).send(success("Successfully added the review", review))
            }

        } catch (error) {
            console.error("Error while entering review:", error);
            return res.status(500).send(failure("internal server error.", error))
        }
    }
}

module.exports = new reviewClass()