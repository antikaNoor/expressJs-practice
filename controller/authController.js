const authModel = require('../model/auth')
const readerModel = require('../model/reader')
const { success, failure } = require('../utils/success-error')
const express = require('express')
const { validationResult } = require('express-validator')
const HTTP_STATUS = require("../constants/statusCode");
const bcrypt = require("bcrypt")
const { default: mongoose } = require('mongoose')

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
    async login(req, res) {
        try {
            const { reader_email, password } = req.body
            const auth = await authModel.findOne({ reader_email }).populate("reader")
            // console.log(auth)
            if (!auth) {
                return res.status(500).send(failure("Reader is not registered"))
            }
            const checkPassword = await bcrypt.compare(password, auth.password)
            console.log(checkPassword)

            if (!checkPassword) {
                return res.status(500).send(failure("Authentication failed"))
            }

            return res.status(200).send(success("Login successful"))
        } catch (error) {
            return res.status(500).send(failure("Internal server error", error))
        }
    }

    async signup(req, res) {
        try {
            const validation = validationResult(req).array()
            if (validation.length > 0) {
                console.log("validation error", validation)
                return res.status(500).send(failure("Failed to add the user", validation))
            }

            const { reader_name, reader_email, password, status } = req.body
            const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
                return hash
            })

            const readerInfo = await readerModel.create({
                reader_name: reader_name,
                reader_email: reader_email,
                status: status,
            })

            const result = await authModel.create({
                reader_email: reader_email,
                password: hashedPassword,
                reader: readerInfo._id
            })

            console.log(result)
            return res.status(200).send(success("Successfully added the user"))
        } catch (error) {
            console.log("Error")
            return res.status(500).send(failure("Internal server error", error))
        }
    }
}

module.exports = new AuthController()