const { success, failure } = require("../utils/success-error")
const path = require("path")
const express = require('express')
const products = require("../model/mangaModel")
const { validationResult } = require('express-validator')

const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.json())

class Manga {
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
    // get all
    async getAll(req, res) {
        try {
            // console.log(req.name)
            const result = await products.getAll()
            if (result.success) {
                res.status(200).send(success(result.message, result.data))
            } else {
                res.status(500).send(failure(result.message))
            }
        } catch (error) {
            res.status(500).send(failure(result.message))
        }
    }

    // get one by id
    async getOneById(req, res) {
        try {
            const { id } = req.params
            const result = await products.getOneById(parseInt(id))
            if (result.success) {
                res.status(200).send(success(result.message, result.data))
            } else {
                res.status(500).send(failure(result.message))
            }
        } catch (error) {
            res.status(500).send(failure(result.message))
        }
    }

    // delete one by id
    async deleteOneById(req, res) {
        try {
            const { id } = req.query

            const result = await products.deleteOneById(parseInt(id))
            if (result.success) {
                res.status(200).send(success(result.message, result.data))
            } else {
                res.status(500).send(failure(result.message))
            }
        } catch (error) {
            res.status(500).send(failure(result.message))
        }
    }

    // Update something
    async updateOneById(req, res) {

        try {
            const { id } = req.params
            const result = await products.updateOneById(
                parseInt(id),
                (req.body)
            )
            if (result.success) {
                res.status(200).send(success(result.message, result.data))
            } else {
                res.status(200).send(failure(result.message, result.data))
            }
            res.status(200).send()
        }
        catch (error) {
            res.status(500).send(failure(result.message))
        }
    }

    // Add something
    async add(req, res) {

        try {
            const result = await products.add(req.body)
            if (result.success) {
                res.status(200).send(success(result.message, result.data))
            } else {
                res.status(200).send(failure(result.message))
            }
            res.status(200).send()
        }
        catch (error) {
            res.status(500).send(failure(result.message))
        }
    }

    // Sort data by id
    async sortById(req, res) {
        try {
            const result = await products.sortDataById()
            if (result.success) {
                res.status(200).send(success(result.message, result.data))
            } else {
                res.status(500).send(failure(result.message))
            }
        } catch (error) {
            res.status(500).send(failure(result.message))
        }
    }

    // Sort data by name
    async sortDataByName(req, res) {
        try {
            const result = await products.sortDataByName()
            if (result.success) {
                res.status(200).send(success(result.message, result.data))
            } else {
                res.status(500).send(failure(result.message))
            }
        } catch (error) {
            res.status(500).send(failure(result.message))
        }
    }

    // get by stock and price
    async getByPriceAndStock(req, res) {
        try {
            const { stock, price } = req.params
            const result = await products.getByPriceAndStock(parseInt(stock), parseFloat(price))
            if (result.success) {
                res.status(200).send(success(result.message, result.data))
            } else {
                res.status(500).send(failure(result.message))
            }
        } catch (error) {
            res.status(500).send(failure(result.message))
        }
    }
}








// app.listen(8000, () => {
//     console.log("Server is running on 8000...")
// })

module.exports = new Manga()