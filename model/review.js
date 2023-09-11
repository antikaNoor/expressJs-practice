const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    reader: {
        type: mongoose.Types.ObjectId,
        ref: "Reader",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    text: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;