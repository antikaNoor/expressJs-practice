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
    // password: {
    //     type: String,
    //     required: true,
    // },
    status: {
        type: Boolean,
        required: false,
        default: false
    }
})

// // Hash the password before saving
// readerSchema.pre("save", async function(next) {
//     if (!this.isModified("password")) return next();

//     const saltRounds = 10;
//     const hash = await bcrypt.hash(this.password, saltRounds);
//     this.password = hash;

//     next();
// });

// // Method to compare passwords
// readerSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

const Reader = mongoose.model("Reader", readerSchema);
module.exports = Reader;