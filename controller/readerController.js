const readerModel = require('../model/reader')
const { success, failure } = require('../utils/success-error')
const express = require('express')
const { validationResult } = require('express-validator')
const HTTP_STATUS = require("../constants/statusCode");
const bcrypt = require("bcrypt")

class readerController {

    // validation
    async create(req, res, next) {
        try {
            const validation = validationResult(req).array()
            console.log("validation error", validation)
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
            const { reader_name, reader_email } = req.body
            console.log(reader_name)
            console.log(reader_email)

            const reader = new readerModel({ reader_name, reader_email })
            console.log(reader)
            await reader.save()

            // return res.status(200).send(success("Successfully added the reader"))

            return res.status(200).send(success("Successfully added the reader"))
            // console.log(read)

            // const hashedPass = await bcrypt.hash(password, 10)
            // if (reader_name.toLowerCase() === "admin") {
            //     console.log("admin")
            //     const readerInfo = {
            //         reader_name: req.body.reader_name,
            //         reader_email: req.body.reader_email,
            //         password: hashedPass,
            //         status: true
            //     }
            //     const reader = new readerModel(readerInfo)
            //     await reader.save()

            //     return res.status(200).send(success("Successfully added the admin"))
            // }
            // else {
            //     console.log("not admin")
            //     const readerInfo = {
            //         reader_name: req.body.reader_name,
            //         reader_email: req.body.reader_email,
            //         password: hashedPass,
            //         status: false
            //     }
            //     const reader = new readerModel(readerInfo)
            //     await reader.save()

            //     return res.status(200).send(success("Successfully added the reader"))
            // }

        } catch (error) {
            console.error("Error while creating reader:", error);
            return res.status(500).send(failure("Could not add the reader"))
        }
    }

    //get all data
    async getAll(req, res) {
        try {
            // console.log(req.name)
            const result = await readerModel.find({});
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
            const result = await readerModel.findById({ _id: id })
            // console.log(result)
            if (result) {
                res.status(200).send(success("Successfully received the reader", result))
            } else {
                res.status(200).send(failure("Can't find the reader"))
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
            // console.log(id);
            const result = await readerModel.findOneAndDelete({ _id: id })
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

    //updatedatabyid
    async updateOneById(req, res) {
        try {
            // const { reader_name, reader_email, read } = req.body
            const { id } = req.params; // Retrieve the id from req.params
            // console.log(id);
            const options = { upsert: true };
            const result = await readerModel.findByIdAndUpdate(id, req.body, options);
            // console.log(result)
            if (result) {
                res.status(200).send(success("Successfully updated the reader", result))
            } else {
                res.status(200).send(failure("Can't find the reader"))
            }

        } catch (error) {
            console.log("error found", error)
            res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new readerController()