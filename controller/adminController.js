const { success, failure } = require("../utils/success-error")
const path = require("path")
const express = require('express')
const admin = require("../model/adminModel")

const app = express()
app.use(express.json())

class AdminController {
    // get admin
    async addAdmin(req, res) {
        try {
            // const { adminName } = req.query

            const result = await admin.addAdmin(req.body)
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