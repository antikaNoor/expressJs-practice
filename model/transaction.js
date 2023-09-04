const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    reader: {
        type: mongoose.Types.ObjectId,
        ref: "Reader",
    },
    total_spent: {
        type: Number,
    },
    bought_books: [
        {
            id: {
                type: mongoose.Types.ObjectId,
                ref: "Book"
            },
            quantity: {
                type: Number,
                default: 1
            },
            date: {
                type: Date,
                default: new Date()
            }
        }
    ]
})

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;