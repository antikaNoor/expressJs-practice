const { success, failure } = require("../utils/success-error")
const express = require('express')
const manga = require("../model/manga")

const app = express()
app.use(express.json())

// Validation fucntion for adding and update
const validationFunc = (req, res, next) => {
    const { name, price, stock, author } = req.body
    const errors = {}
    if (!name || name === "") {
        errors.name = "Name is not provided"
    }
    if (!price || price === "" || price > 1000) {
        errors.price =
            "Price should be provided, and it should be less than 1000."
    }
    if (!stock || stock === "" || stock === 0) {
        errors.stock =
            "Stock should be provided, and it should be greater than 0."
    }
    if (!author || author === "" || author === "Unknown") {
        errors.author =
            "Author name should be provided, and it should not be unknown."
    }
    if (Object.keys(errors).length > 0) {
        res.status(500).send(failure(success, errors))
    }
    if (Object.keys(errors).length === 0) {
        next()
    }
}

module.exports = validationFunc