const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
    reader_name: {
        type: String,
        unique: true
    },
    reader_email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
    },
    status: {
        type: Boolean,
    },
    loginAttempt: {
        type: Number,
        default: 0
    },
    reader: {
        type: mongoose.Types.ObjectId,
        ref: "Reader",
        required: true
    },

}, { timestamps: true })

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;