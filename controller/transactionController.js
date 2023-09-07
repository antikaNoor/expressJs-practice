const bookModel = require('../model/book')
const readerModel = require('../model/reader')
const transactionModel = require('../model/transaction')
const { success, failure } = require('../utils/success-error')
const express = require('express')
const { validationResult } = require('express-validator')
const mongoose = require("mongoose")
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

            let totalSpent = 0
            let existingTransaction = await transactionModel.findOne({ reader });

            if (existingTransaction) {
                // Checking for the index of the book ID that matches the one that is being sent in the request. 
                // If a matching ID is found, it is assigned in the variable "existingBookEntryIndex"
                // Otherwise, it stays -1, which is just something I have kept like a flag
                let existingBookEntryIndex = -1
                existingTransaction.bought_books.map(
                    (entry, i) => {
                        if (String(entry.id) === req.body.bought_books.id) {
                            existingBookEntryIndex = i
                        }
                    }
                );

                // Your code before wasn't working because you were incrementing the quantity, but it was not happening on the "existingTransaction" object
                // In order to update something, and use the save() method on it, the change must be made on the object that was fetched from the database
                // Which in this case, was the "existingTransaction" 
                if (existingBookEntryIndex >= 0) {
                    //increase quantity
                    console.log("increase quantity")
                    existingTransaction.bought_books[existingBookEntryIndex].quantity++
                }
                else {
                    console.log("entering new book for existing user")
                    // There is an issue when you just push the entire "bought_books" property from body into this array
                    // The conflict arises when the object ID you are providing in the body is unable to be parsed directly from string to object ID.
                    // This is why its best to handle situations like these using mongoose.Types.ObjectId function, which converts the string to an object ID before saving
                    existingTransaction.bought_books.push({ id: new mongoose.Types.ObjectId(bought_books.id) })
                }
            }
            else {
                existingTransaction = new transactionModel({ reader, bought_books })
            }

            // Calculate the total spent for this transaction
            for (const book of existingTransaction.bought_books) {
                const bookData = await bookModel.findById(book.id);
                if (!bookData) {
                    return res.status(400).send(failure("Book with ID ${book.title} not found"));
                }

                totalSpent += bookData.price * book.quantity;
                let updateStock = bookData.stock
                console.log("updated stock is: ", updateStock)
                if(bookData.stock <= 0) {
                    return res.status(400).send(failure("Sorry, low stock!"));
                }
                bookData.stock--
                console.log("updated stock after purchasing is: ", updateStock)
                // bookData.stock = updateStock
                await bookData.save();
            }

            // Update the total_spent field
            existingTransaction.total_spent = totalSpent;
            await existingTransaction.save();

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
                .populate("reader", "-password")
                .populate("bought_books.id")
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