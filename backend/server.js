import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as socketio from "socket.io";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import householdRoutes from "./routes/householdRoutes.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/household", householdRoutes);
//app.use("/api/upload", uploadRoutes);

//const __dirname = path.resolve()
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

var server = app.listen(5000, console.log("Server is running on port 5000."));

const io = new socketio.Server(server);

var usersCounter = 0;

io.on("connection", (socket) => {
    usersCounter++;
    socket.on("disconnect", () => {
        usersCounter--;
        io.emit("count", usersCounter);
    });
    io.emit("count", usersCounter);
});
