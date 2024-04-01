const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    publishedData: {
        type: String,
    },
    
    genres: {
        type: [String]
    },

    discription: {
        type: String,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },

});

let Book = mongoose.model("Book" , bookSchema);

module.exports = {Book};