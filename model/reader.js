const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const readerSchema = new mongoose.Schema({
    reader_name: {
        type: String,
        required: [true, "Usrename should be provided"],
        unique: true,
        maxLength: 30
    },
    reader_email: {
        type: String,
        required: [true, "Email should be provided"],
        unique: true
    },
    status: {
        type: Boolean
    },

}, { timestamps: true })

const Reader = mongoose.model("Reader", readerSchema);
module.exports = Reader;