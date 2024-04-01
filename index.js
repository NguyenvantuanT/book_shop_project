const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");


const authorRoute = require("./routers/author");
const bookRoute = require("./routers/book");
const categoryRoute = require("./routers/category");
const userRoute = require("./routers/user");

dotenv.config();
//CONNECT DB
mongoose.connect("mongodb://localhost:27017/do_an_book_shop")
    .then(() => console.log("Connect to mongoDB"))
    .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("common"));

//ROUTE
app.use("/v1/author" , authorRoute);
app.use("/v1/book" , bookRoute);
app.use("/v1/category" , categoryRoute);
app.use("/v1/user" , userRoute);
// 

app.listen(8081 , () => {
    console.log("Server is running...");
});