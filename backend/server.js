const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

const productRoutes = require("./routes/productRoutes.js");

dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);

app.listen(5000, console.log("Server is running on port 5000."));
