const express = require('express')
const routes = express()
const readerValidation = require('../middleware/readerValidation')
// const checkLogin = require('../middleware/checkLogin')
const AdminLoginController = require('../controller/adminLoginController')
const AuthController = require('../controller/authController')
const readerController = require('../controller/readerController')
const bookController = require("../controller/bookController")
const transactionController = require("../controller/transactionController")
const authController = require('../controller/authController')
const Auth = require('../model/auth')

routes.post("/signup", readerValidation.signup, AuthController.create, AuthController.signup)

routes.post("/add-book", bookController.add)
routes.get("/get-all-books", bookController.getAll)

routes.post("/add-reader", readerValidation.create, readerController.create, readerController.add)

routes.post("/add-transaction", transactionController.add)
routes.get("/get-transaction", transactionController.getAll)

module.exports = routes