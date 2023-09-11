const express = require('express')
const routes = express()
const readerValidation = require('../middleware/readerValidation')
const { checkLogin, isAdmin, isVerified } = require('../middleware/auth')
const AuthController = require('../controller/authController')
const readerController = require('../controller/readerController')
const bookController = require("../controller/bookController")
const cartController = require("../controller/CartController")
const authController = require('../controller/authController')
const reviewController = require('../controller/reviewController')
const Auth = require('../model/auth')

routes.post("/signup", readerValidation.signup, AuthController.create, AuthController.signup)
routes.post("/login", AuthController.login)
routes.post("/refresh", checkLogin, authController.refresh)

routes.post("/add-book", checkLogin, isAdmin, bookController.add)
routes.get("/get-all-books", bookController.getAll)
routes.get("/get-book-by-id/:id", bookController.getOneById)
routes.delete("/del-book-by-id/:id", checkLogin, isAdmin, bookController.deleteOneById)

routes.post("/add-reader", readerValidation.create, readerController.create, readerController.add)

routes.post("/add-to-cart", isVerified, cartController.add)
routes.patch("/delete-from-cart", isVerified, cartController.delete)
routes.post("/checkout", isVerified, cartController.checkOut)

routes.get("/get-transaction", cartController.getAll)

routes.post("/review", isVerified, reviewController.add)

module.exports = routes