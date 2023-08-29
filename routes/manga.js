const express = require('express')
const routes = express()
const mangaController = require('../controller/manga')
const createValidation = require('../middleware/validation')


routes.get("/all", mangaController.getAll)
routes.get("/detail/:id", mangaController.getOneById)
routes.delete("/delete", mangaController.deleteOneById)
routes.put("/up/:id", createValidation, mangaController.updateOneById)
routes.post("/create", createValidation, mangaController.add)
routes.get("/sortbyid", mangaController.sortById)
routes.get("/sortbyname", mangaController.sortDataByName)
routes.get("/stockandprice/:stock/:price", mangaController.getByPriceAndStock)

module.exports = routes