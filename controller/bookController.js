const bookModel = require('../model/book')
const { success, failure } = require('../utils/success-error')
const express = require('express')
const { validationResult } = require('express-validator')
// const HTTP_STATUS = require("../constants/statusCode");

class bookController {

    // validation
    async create(req, res, next) {
        try {
            const validation = validationResult(req).array()
            if (validation.length > 0) {
                return res.status(422).send({ message: "validation error", validation })
            }
            else {
                next()
            }
        } catch (error) {
            console.log("error has occured")
        }
    }

    //add data
    async add(req, res) {
        try {
            const { title, author, genre, pages, price, stock } = req.body
            console.log(title)
            console.log(author)
            console.log(genre)
            let existingBook = await bookModel.findOne({ title, author })
            if (existingBook) {
                return res.status(500).send(failure("This book already exists!"))
            }
            else {
                const book = new bookModel({ title, author, genre, pages, price, stock })
                console.log(book)
                await book.save()

                return res.status(200).send(success("Successfully added the book"))
            }
        } catch (error) {
            console.error("Error while entering book:", error);
            return res.status(500).send(failure("Could not add the book"))
        }
    }

    //get all data
    async getAll(req, res) {
        try {
            // console.log(req.name)
            const result = await bookModel.find({});
            console.log(result)
            if (result.length > 0) {
                return res
                    .status(200)
                    .send(success("Successfully received all readers", { reader: result, total: result.length }));
            }
            return res.status(500).send(success("No readers were found"));

        } catch (error) {
            res.status(500).send(failure(error.message))
        }
    }

    //get one data by id
    async getOneById(req, res) {
        try {
            const { id } = req.params; // Retrieve the id from req.params
            // console.log(id);
            const result = await bookModel.findById({ _id: id })
            console.log(result)
            if (result) {
                res.status(200).send(success("Successfully received the book", result))
            } else {
                res.status(200).send(failure("Can't find the book"))
            }

        } catch (error) {
            console.log("error found", error)
            res.status(500).send(failure("Internal server error"))
        }
    }

    //delete data by id
    async deleteOneById(req, res) {
        try {
            const { id } = req.params; // Retrieve the id from req.params
            console.log(id);
            const result = await bookModel.findOneAndDelete({ _id: id })
            // console.log(result)
            if (result) {
                res.status(200).send(success("Successfully deleted the reader", result))
            } else {
                res.status(200).send(failure("Can't find the reader"))
            }

        } catch (error) {
            console.log("error found", error)
            res.status(500).send(failure("Internal server error"))
        }
    }

    // //updatedatabyid
    // async updateOneById(req, res) {
    //     try {
    //         // const { reader_name, reader_email, read } = req.body
    //         const { id } = req.params; // Retrieve the id from req.params
    //         // console.log(id);
    //         const options = { upsert: true };
    //         const result = await bookModel.findByIdAndUpdate(id, req.body, options);
    //         // console.log(result)
    //         if (result) {
    //             res.status(200).send(success("Successfully updated the reader", result))
    //         } else {
    //             res.status(200).send(failure("Can't find the reader"))
    //         }

    //     } catch (error) {
    //         console.log("error found", error)
    //         res.status(500).send(failure("Internal server error"))
    //     }
    // }
}

module.exports = new bookController()