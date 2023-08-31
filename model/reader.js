const mongoose = require("mongoose")

const readSchema = new mongoose.Schema({
    book_name: {
        type: String,
        required: false,
        default: "Unknown"
    },
    date: {
        type: Date,
        required: false,
        default: new Date()
    }
})
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
    read: {
        type: [readSchema]
    }
    // rank: {
    //     type: Number,
    //     required: false,
    //     default: 1,
    //     min: 1,
    //     max: 10
    // },

    // createdAt: {
    //     type: Date,
    //     required: false,
    //     default: new Date()
    // },
    // status: {
    //     type: Boolean,
    //     required: false,
    //     default: false
    // }
})

const Reader = mongoose.model("Reader", readerSchema);
module.exports = Reader;