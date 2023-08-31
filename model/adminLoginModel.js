const fs = require("fs")
const fsPromise = require("fs").promises
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { success, failure } = require("../utils/success-error")
const dotenv = require('dotenv')
dotenv.config()

class AdminLogin {
  async loginAdmin(body) {
    // console.log("Hi")
    try {
      const data = await fsPromise.readFile(
        path.join(__dirname, "..", "data", "admin.json"),
        {
          encoding: "utf-8",
        }
      );

      const adminArray = JSON.parse(data);
      // console.log(adminArray)
      const admin = adminArray.find((element) => element.name === body.name);
      // console.log(admin.name)
      if (admin) {
        const passwordMatch = await bcrypt.compare(body.password, admin.password);
        if (passwordMatch) {
          // console.log(passwordMatch)
          // now we have to give admin a JWT, so that she can use the token for authentication.
          // npm i jsonwebtoken
          // jwt.sign - data and secret password (resides in the server)
          // so that the data can be signed by this secret code then admin can use the signed code 
          // console.log(process.env.JWT_SECRET)
          const token = jwt.sign(
            {
              name: admin.name,
            },
            process.env.JWT_SECRET, {
            expiresIn: '1h'
          }
          );
          // const tokenJson = JSON.parse(token)
          // console.log(token)

          return {
            success: true,
            message: "Successfully logged in!",
            data: token,
          };
        } else {
          return {
            success: false,
            message: "Authentication failed!",
          };
        }
      } else {
        return {
          success: false,
          message: "Authentication failed!",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Internal server error!",
      };
    }
  }
}

module.exports = new AdminLogin();