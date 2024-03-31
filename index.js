const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRoute = require("./routers/author");
const bookRoute = require("./routers/book");


dotenv.config();
//CONNECT DB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connect to mongoDB"))
    .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));

//ROUTE
app.use("/v1/author" , authorRoute);
app.use("/v1/book" , bookRoute);


app.listen(8081 , () => {
    console.log("Server is running...");
});