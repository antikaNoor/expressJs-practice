const bookModel = require('../model/book')
const readerModel = require('../model/reader')
const transactionModel = require('../model/transaction')
const { success, failure } = require('../utils/success-error')
const express = require('express')
const { validationResult } = require('express-validator')
// const HTTP_STATUS = require("../constants/statusCode");

class transactionController {

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
        // price will be added to the transaction schema
        // stock will decrease from the books schema
        // quantity will be increased in the transaction schema for a book if a reader buys the same book again
        try {
            const { reader, bought_books } = req.body

            let existingTransaction = await transactionModel.findOne({ reader });

            if (existingTransaction) {
                const existingBookEntry = existingTransaction.bought_books.filter(
                    (entry) => entry.id === req.body.bought_books.id
                );
                console.log(existingBookEntry.length > 0)
                if (existingBookEntry) {
                    //increase quantity
                    console.log("increase")

                    // updateQuantity++
                    existingBookEntry.quantity++
                    await existingTransaction.save();
                }
                else {
                    console.log("enter book")
                    existingTransaction.bought_books.push({ bought_books })
                    await existingTransaction.save();
                }

            }
            else {
                const transaction = new transactionModel({ reader, bought_books })
                await transaction.save()
            }
            // for (const book of bought_books) {
            //     const bookData = await bookModel.findById(book.id)
            //     if (!bookData) {
            //         return res.status(400).send(failure(`Book with ID ${book.title} not found`));
            //     }

            //     console.log(bookData)
            // }

            // const transaction = new transactionModel({ reader, bought_books })
            // console.log(transaction)
            // await transaction.save()

            return res.status(200).send(success("Successfully added the transaction"))
        } catch (error) {
            console.error("Error while entering transaction:", error);
            return res.status(500).send(failure("Could not add the transaction"))
        }
    }

    //get all data
    async getAll(req, res) {
        try {
            // console.log(req.name)
            const result = await transactionModel.find({})
                .populate("reader")
                .populate("bought_books.id", "-password")
            console.log(result)
            if (result.length > 0) {
                return res
                    .status(200)
                    .send(success("Successfully received all transactions", result));
            }
            return res.status(500).send(success("No transactions were found"));

        } catch (error) {
            res.status(500).send(failure(error.message))
        }
    }

    //     //get one data by id
    //     async getOneById(req, res) {
    //         try {
    //             const { id } = req.params; // Retrieve the id from req.params
    //             // console.log(id);
    //             const result = await bookModel.findById({ _id: id })
    //             // console.log(result)
    //             if (result) {
    //                 res.status(200).send(success("Successfully received the reader", result))
    //             } else {
    //                 res.status(200).send(failure("Can't find the reader"))
    //             }

    //         } catch (error) {
    //             console.log("error found", error)
    //             res.status(500).send(failure("Internal server error"))
    //         }
    //     }
}

module.exports = new transactionController()