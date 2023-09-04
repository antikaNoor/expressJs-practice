const { success, failure } = require("../utils/success-error");
const readerModel = require("../model/reader");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

class AdminLoginController {
  async loginAdmin(req, res) {
    try {
      // const result = await adminLoginModel.loginAdmin(req.body)
      console.log("start")
      const { reader_name, password } = req.body
      console.log("name", reader_name)
      const adminData = await readerModel.findOne({reader_name})
      // const admin = adminArray.find((element) => element.name === body.name);
      console.log(adminData)
      if (adminData) {
        const passwordMatch = await bcrypt.compare(password, adminData.password);
        if (passwordMatch) {
          // console.log(passwordMatch)
          // now we have to give admin a JWT, so that she can use the token for authentication.
          // npm i jsonwebtoken
          // jwt.sign - data and secret password (resides in the server)
          // so that the data can be signed by this secret code then admin can use the signed code 
          // console.log(process.env.JWT_SECRET)
          const token = jwt.sign(
            {
              reader_name: adminData.reader_name,
            },
            process.env.JWT_SECRET, {
            expiresIn: '1h'
          }
          );
          res.status(200).send(success("Welcome admin"));
        }
        else {
          res.status(500).send(failure("Cannot Login"));
        }
      }

    } catch (error) {
      res.status(500).send(failure(error.message));
    }
  }
}

module.exports = new AdminLoginController();