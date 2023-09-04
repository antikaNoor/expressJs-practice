const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
    reader_email: {
        type: String,
        required: [true, "Email should be provided"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
    },
    status: {
        type: Boolean,
        required: false
        // default: false
    },
    // reader: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Reader",
    //     required: true
    // }
})

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;