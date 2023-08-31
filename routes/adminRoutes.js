const express = require('express')
const routes = express()
const adminController = require('../controller/adminController')
// const createValidation = require('../middleware/validation')


routes.post("/adminadd", adminController.addAdmin)

module.exports = routes