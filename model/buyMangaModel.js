const fs = require("fs");
const path = require("path");
const fsPromise = require("fs").promises

class BuyManga {
    //add to the json file
    async buyMangaFunc(userId, mangaId) {

        try {
            const users = await fsPromise.readFile(
                path.join(__dirname, "..", "data", "user.json"),
                {
                    encoding: "utf-8",
                }
            )
            const mangaList = await fsPromise.readFile(
                path.join(__dirname, "..", "data", "manga.json"),
                {
                    encoding: "utf-8",
                }
            )

            const usersJson = JSON.parse(users); // Parse JSON data to array
            const mangaJson = JSON.parse(mangaList); // Parse JSON data to array
            console.log(mangaJson)
            console.log(usersJson)

            const userToPopulate = usersJson.find((user) => user.userId === parseInt(userId));
            const mangaToUpdate = mangaJson.find((manga) => manga.mangaId === parseInt(mangaId));
            console.log(userId)
            console.log(mangaId)

            console.log(userToPopulate)
            console.log(mangaToUpdate)

            if (userToPopulate && mangaToUpdate && mangaToUpdate.stock > 0) {
                // Add manga id to user's bought_manga array
                if (!userToPopulate.bought_manga && !userToPopulate.total_purchase) {
                    userToPopulate.bought_manga = [];
                    userToPopulate.total_purchase
                }
                userToPopulate.bought_manga.push(parseInt(mangaId));

                userToPopulate.total_purchase = (userToPopulate.total_purchase || 0) + mangaToUpdate.price;


                // Decrease manga stock
                mangaToUpdate.stock--;

                // Update usersJson and mangaJson arrays in memory
                const updatedUsersJson = usersJson.map((user) =>
                    user.userId === userToPopulate.userId ? userToPopulate : user
                );

                const updatedMangaJson = mangaJson.map((manga) =>
                    manga.mangaId === mangaToUpdate.mangaId ? mangaToUpdate : manga
                );
                // Write updated data back to JSON files
                await fsPromise.writeFile(
                    path.join(__dirname, "..", "data", "user.json"),
                    JSON.stringify(updatedUsersJson),
                    { encoding: "utf-8" }
                )
                await fsPromise.writeFile(
                    path.join(__dirname, "..", "data", "manga.json"),
                    JSON.stringify(updatedMangaJson),
                    { encoding: "utf-8" }
                )

                return { success: true, message: "Successful" }; // Successful purchase
            }

            return { success: false, message: "Cannot buy manga" }; // Purchase failed
        } catch (error) {
            return { success: false, message: "Internal server error!" }
        }
    }
}

module.exports = new BuyManga()

// Example usage
// const userId = 3; // User ID
// const mangaId = 40; // Manga ID

// if (buyManga(userId, mangaId)) {
//     console.log("Manga bought successfully!");
// } else {
//     console.log("Manga purchase failed.");
// }
