const auth = require('../model/auth')
const readerModel = require('../model/reader')
const { success, failure } = require('../utils/success-error')
const express = require('express')
const { validationResult } = require('express-validator')
const HTTP_STATUS = require("../constants/statusCode");
const bcrypt = require("bcrypt")

class AuthController {

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
    async login() {

    }

    async signup(req, res) {
        try {
            const validation = validationResult(req).array()
            if (validation.length > 0) {
                console.log("validation error", validation)
                return res.status(500).send(failure("Failed to add the user", validation))
            }

            const { email, password, status } = req.body
            const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
                return hash
            })

            const result = await auth.create({
                email: email,
                password: hashedPassword,
                status: status
                // reader: reader
            })
            // if (!result) {
            //     const readerData = await readerModel.findOne({ reader })
            //         .populate("status")

            //     await readerModel.save()
            //     // return res.status(500).send(failure("Failed to add the user"))
            // }
            return res.status(200).send(success("Successfully added the user"))
        } catch (error) {
            console.log("Error")
            return res.status(500).send(failure("Internal server error", error))
        }
    }
}

module.exports = new AuthController()