const mongoose = require("mongoose")

// const boughtBookSchema = new mongoose.Schema({
//     id: {
//         type: mongoose.Types.ObjectId,
//         required: [true, "title should be provided"],
//         ref: "Book",
//     },
//     quantity: {
//         type: Number,
//         default: 0
//     },
//     date: {
//         type: Date,
//         default: new Date()
//     }
// })

const transactionSchema = new mongoose.Schema({
    reader: {
        type: mongoose.Types.ObjectId,
        // required: [true, "Reader name should be provided"],
        ref: "Reader",
        // unique: true,
    },
    total_spent: {
        type: Number,
        default: 0
    },
    bought_books: [
        {
            id: {
                type: mongoose.Types.ObjectId, ref: "Book"
            },
            quantity: {
                type: Number,
                default: 0
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