const { body } = require("express-validator")

const validator = {
    create: [
        body("reader_name")
            .isString()
            .withMessage("email must be a string.")
            .custom((value) => {
                if (value === "Unknown") {
                    throw new Error("Name cannot be unknown")
                }
                return true
            }),

        body("reader_email")
            .isString()
            .withMessage("email must be a string."),

        // body("price")
        //     .exists()
        //     .withMessage("This request must contain the price of the manga.")
        //     .custom((value) => {
        //         if (value > 1000) {
        //             throw new Error("Price cannot be more than 1000.")
        //         }
        //         return true
        //     }),

        // body("stock")
        //     .exists()
        //     .withMessage("This request must contain the stock of the manga.")
        //     .custom((value) => {
        //         if (value < 10) {
        //             throw new Error("Stock cannot be less than 10.")
        //         }
        //         return true
        //     }),

        // body("author")
        //     .exists()
        //     .withMessage("Must provide author name")
        //     .isString()
        //     .withMessage("Author name must be a string.")
        //     .custom((value) => {
        //         if (value === "Unknown") {
        //             throw new Error("Author name cannot be unknown.")
        //         }
        //         return true
        //     })
    ]
}

module.exports = validator
// const { success, failure } = require("../utils/success-error")
// const express = require('express')
// const manga = require("../model/mangaModel")

// const app = express()
// app.use(express.json())

// // Validation fucntion for adding and update
// const validationFunc = (req, res, next) => {
//     const { name, price, stock, author } = req.body
//     const errors = {}
//     if (!name || name === "") {
//         errors.name = "Name is not provided"
//     }
//     if (!price || price === "" || price > 1000) {
//         errors.price =
//             "Price should be provided, and it should be less than 1000."
//     }
//     if (!stock || stock === "" || stock === 0) {
//         errors.stock =
//             "Stock should be provided, and it should be greater than 0."
//     }
//     if (!author || author === "" || author === "Unknown") {
//         errors.author =
//             "Author name should be provided, and it should not be unknown."
//     }
//     if (Object.keys(errors).length > 0) {
//         res.status(500).send(failure(success, errors))
//     }
//     if (Object.keys(errors).length === 0) {
//         next()
//     }
// }

// module.exports = validationFunc