const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const app = express();

app.listen(5000, console.log("Server is running on port 5000."));
