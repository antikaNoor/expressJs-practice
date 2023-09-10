const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
const authModel = require('../model/auth')
const readerModel = require('../model/reader')
const { success, failure } = require("../utils/success-error")
dotenv.config()

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers
    try {
        if (authorization) {
            const token = authorization.split(' ')[1]
            // verifying the token provided in the authorization header with the secret key in .env file
            const verified = jwt.verify(token, process.env.JWT_SECRET)

            if (verified) {
                console.log("Verified", verified.reader_email)
                next()
            }
            else {
                return res.status(500).send(failure("Authorization failed"))
            }
        }
        else {
            return res.status(500).send(failure("Authorization failed"))
        }
    } catch (error) {
        return res.status(500).send(failure("Internal server error"))
    }
}

const isAdmin = (req, res, next) => {
    const { authorization } = req.headers
    try {
        if (authorization) {
            const token = authorization.split(' ')[1]
            const decodedToken = jwt.decode(token, { complete: true })
            if (decodedToken.payload.reader.status === true) {
                next()
            }
            else {
                return res.status(500).send(failure("Only admin can add a book"))
            }
        }
        else {
            return res.status(500).send(failure("Authorization failed"))
        }
    } catch (error) {
        return res.status(500).send(failure("Internal server error"))
    }
}

const isVerified = (req, res, next) => {
    try {
        const {authorization} = req.headers
        if(!authorization) {
            return res.status(500).send(failure("Authorization failed..."));
        }

        // console.log(authorization)
        const token = authorization.split(' ')[1]
        const decodedToken = jwt.decode(token, {complete: true})

        if(!decodedToken) {
            return res.status(500).send(failure("Authorization failed"));
        }

        console.log(decodedToken.payload.reader._id)
        const readerIdFromToken = decodedToken.payload.reader._id
        if (readerIdFromToken === req.body.reader) {
            // The token belongs to the same reader, so they are verified to perform the action
            next();
        } else {
            return res.status(500).send(failure("Authorization failed: Token does not match the reader"));
        }
    } catch (error) {
        return res.status(500).send(failure("Internal server error", error))
    }
}

module.exports = {
    checkLogin,
    isAdmin,
    isVerified
}