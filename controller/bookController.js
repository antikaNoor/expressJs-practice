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
            let { page, limit, sort, min, max } = req.query

            // Total number of records in the whole collection
            const totalRecords = await bookModel.countDocuments({})

            // if (!page || !limit) {
            //     page = 2
            //     limit = totalRecords / page
            // }
            if (page < 1 || limit < 0) {
                return res.status(500).send(failure("Page must be at least 1 and limit must be at least 0"))
            }

            // sorting
            const sortOptions = {}
            if (sort) {
                console.log(sort)
                const part = sort.split(":")
                console.log(part[1])
                const sortBy = part[0]
                const sortOrder = part[1]

                if (sortOrder === 'desc') {
                    sortOptions[sortBy] = -1;
                } else if (sortOrder === 'asc') {
                    sortOptions[sortBy] = 1;
                }
                else {
                    return res.status(500).send(failure("Please enter a valid order!"))
                }
            }

            // Filtering
            const filterOptions = {}
            if (min !== undefined) {

                const partMin = min.split(":")
                console.log(partMin[0].toString())
                const valueMin = partMin[0].toString()
                filterOptions.valueMin = { $gte: parseFloat(partMin[1]) }
                console.log(filterOptions.valueMin)
            }

            if (max !== undefined) {
                const partMax = max.split(":")
                const valueMax = partMax[0].toString()
                if (filterOptions.valueMax === undefined) {
                    filterOptions.valueMax = { $lte: parseFloat(partMax[1]) }
                    console.log("min price has not been provided")
                }
                else {
                    filterOptions.valueMax.$lte = parseFloat(partMax[1])
                    console.log("There is a min price there")
                    console.log(filterOptions.valueMax)
                }
            }

            // Pagination
            const result = await bookModel.find(filterOptions)
                .sort(sortOptions)
                .skip((page - 1) * limit)
                .limit(limit)

            if (result.length > 0) {
                const paginationResult = {
                    reader: result,
                    totalInCurrentPage: result.length,
                    currentPage: parseInt(page),
                    totalRecords: totalRecords
                }
                return res
                    .status(200)
                    .send(success("Successfully received all books", paginationResult));
            }
            return res.status(500).send(success("No book was found"));

        } catch (error) {
            return res.status(500).send(failure(error.message))
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