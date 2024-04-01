const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },

    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"

        }
    ]


});

let Category = mongoose.model("Category", categorySchema)

module.exports = { Category };