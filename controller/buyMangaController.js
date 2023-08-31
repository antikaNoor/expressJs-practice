const buyMangaModel = require("../model/buyMangaModel")
const { success, failure } = require("../utils/success-error")

// console.log(buyMangaModel)
// // Example usage
// const userId = 2; // User ID
// const mangaId = 39; // Manga ID

// if (buyMangaModel(userId, mangaId)) {
//     console.log("Manga bought successfully!");
// } else {
//     console.log("Manga purchase failed.");
// }

class BuyMangaController {
    // get admin
    async buyMangaFunc(req, res) {
        try {
            const { userId, mangaId } = req.params
            // console.log(userId, mangaId)
            const result = await buyMangaModel.buyMangaFunc(userId, mangaId)
            console.log(result)
            if (result.success) {
                res.status(200).send(success("Manga bought successfully!"))
            } else {
                res.status(500).send(failure("Manga cannot be bought!"))
            }
        } catch (error) {
            res.status(500).send(failure(error.message))
        }
    }
}

module.exports = new BuyMangaController()