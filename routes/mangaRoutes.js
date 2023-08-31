const express = require('express')
const routes = express()
const mangaController = require('../controller/mangaController')
const BuyMangaController = require('../controller/buyMangaController')
const createValidation = require('../middleware/validation')
const checkLogin = require('../middleware/checkLogin')
const buyMangaController = require('../controller/buyMangaController')
const readerController = require('../controller/readerController')


// routes.get("/all", checkLogin, mangaController.getAll)
// routes.get("/detail/:id", mangaController.getOneById)
// routes.delete("/delete", mangaController.deleteOneById)
// routes.put("/up/:id", checkLogin, createValidation.create, mangaController.create, mangaController.updateOneById)
// routes.post("/create", checkLogin, createValidation.create, mangaController.create, mangaController.add)
// routes.get("/sortbyid", mangaController.sortById)
// routes.get("/sortbyname", mangaController.sortDataByName)
// routes.get("/stockandprice/:stock/:price", mangaController.getByPriceAndStock)

routes.post("/mongoadd", checkLogin, createValidation.create, readerController.create, readerController.add)
routes.get("/mongoall", readerController.getAll)
routes.get("/mongofindbyid/:id", readerController.getOneById)
routes.delete("/mongodeletebyid/:id", readerController.deleteOneById)
routes.put("/mongoupbyid/:id", createValidation.create, readerController.create, readerController.updateOneById)

routes.get("/buy/:userId/:mangaId", buyMangaController.buyMangaFunc)

module.exports = routes