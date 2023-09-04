const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers
    // console.log(req.headers)
    try {
        // console.log(req.headers)
        if (authorization) {
            const token = authorization.split(' ')[1]
            // console.log(token)
            // verifying the token provided in the authorization header with the secret key in .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(decoded)
            // the data is in the variable decoded now. We're gonna destructure it and get the name 
            const { reader_name } = decoded
            // authenticated name is assigned to req.name so that we can access it from elsewhere
            req.reader_name = reader_name
            // console.log(name)
            next()
        }
        else {
            res.send("Error")
        }
    } catch (error) {
        // console.log("Authentication error")
        res.send("Authentication Error")
    }
}

module.exports = checkLogin