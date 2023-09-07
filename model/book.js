const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title should be provided"],
        maxLength: 100
    },
    author: {
        type: String,
        required: [true, "Author name should be provided"]
    },
    genre: {
        type: [String],
        required: false
    },
    pages: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: [true, "Price should be provided"]
    },
    stock: {
        type: Number,
        required: [true, "Stock should be provided"]
    }
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;