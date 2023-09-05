const express = require('express')
const routes = express()
const readerValidation = require('../middleware/readerValidation')
const { checkLogin, isAdmin } = require('../middleware/auth')
const AuthController = require('../controller/authController')
const readerController = require('../controller/readerController')
const bookController = require("../controller/bookController")
const transactionController = require("../controller/transactionController")
const authController = require('../controller/authController')
const Auth = require('../model/auth')

routes.post("/signup", readerValidation.signup, AuthController.create, AuthController.signup)
routes.post("/login", AuthController.login)

routes.post("/add-book", checkLogin, isAdmin, bookController.add)
routes.get("/get-all-books", bookController.getAll)
routes.get("/get-book-by-id", checkLogin, isAdmin, bookController.getOneById)
routes.delete("/del-book-by-id", checkLogin, isAdmin, bookController.deleteOneById)

routes.post("/add-reader", checkLogin, readerValidation.create, readerController.create, readerController.add)

routes.post("/add-transaction", transactionController.add)
routes.get("/get-transaction", transactionController.getAll)

module.exports = routes