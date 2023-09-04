const fs = require("fs")
const fsPromise = require("fs").promises
const path = require("path")
const bcrypt = require("bcrypt")
const { success, failure } = require("../utils/success-error")

class Admin {
  //add to the json file
  async addAdmin(body) {
    try {
      if (body) {
        const hashedPassAdmin = await bcrypt.hash(body.password, 10)
        const adminInfo = {
          name: body.name,
          password: hashedPassAdmin
        }

        // Write in the file
        await fsPromise.writeFile(
          path.join(__dirname, "..", "data", "admin.json"),
          JSON.stringify(adminInfo),
          { encoding: "utf-8" }
        )

        return { success: true, message: "Admin added successfully" }
      } else {
        return { success: false, message: "Something is wrong!" }
      }
    } catch (error) {
      return { success: false, message: "Internal server error!" }
    }
  }
}

module.exports = new Admin()