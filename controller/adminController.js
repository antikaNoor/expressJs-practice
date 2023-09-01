const { success, failure } = require("../utils/success-error")
const path = require("path")
const express = require('express')
// const admin = require("../model/adminModel")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())

class AdminController {
    // get admin
    async addAdmin(req, res) {
        try {
            if (req.body) {
                const { reader_name, reader_email, password } = req.body

                const hashedPassAdmin = await bcrypt.hash(password, 10)
                const adminInfo = {
                    name: body.name,
                    password: hashedPassAdmin
                }
                const reader = new bookModel({ title, author, genre, pages, price, stock })
                console.log(book)
                await book.save()
            }

            // const { adminName } = req.query

            // const result = await admin.addAdmin(req.body)
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

module.exports = new AdminController()