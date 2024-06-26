const mongoose = require("mongoose");
const Book = require("./book_model");

const authorSchema = new mongoose.Schema({
    name: {
        type: String, 
    },

    year: {
        type: Number,
    },

    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});

let Author = mongoose.model("Author" , authorSchema);

module.exports = {Author};