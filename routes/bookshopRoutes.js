const express = require('express')
const routes = express()
const createValidation = require('../middleware/validation')
const checkLogin = require('../middleware/checkLogin')
const readerController = require('../controller/readerController')
const bookController = require("../controller/bookController")
const transactionController = require("../controller/transactionController")

routes.post("/mongoadd", checkLogin, createValidation.create, readerController.create, readerController.add)
routes.get("/mongoall", readerController.getAll)
routes.get("/mongofindbyid/:id", readerController.getOneById)
routes.delete("/mongodeletebyid/:id", readerController.deleteOneById)
routes.put("/mongoupbyid/:id", createValidation.create, readerController.create, readerController.updateOneById)

routes.post("/add-book", bookController.add)
routes.get("/get-all-books", bookController.getAll)

routes.post("/add-reader", createValidation.create, readerController.create, readerController.add)

routes.post("/add-transaction", transactionController.add)
routes.get("/get-transaction", transactionController.getAll)

module.exports = routes