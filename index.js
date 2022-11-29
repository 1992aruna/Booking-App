const express = require ("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require ("mongoose");
const authRoute = ("./routes/auth.js");
const usersRoute = ("./routes/users.js");
const hotelsRoute = ("./routes/hotels.js");
const roomsRoute = ("./routes/rooms.js");

require("dotenv").config();
const app = express();

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  }); 

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.set("${api}/auth", authRoute);
app.set("${api}/users", usersRoute);
app.set("${api}/hotels", hotelsRoute);
app.set("${api}/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(8800, ()=>{
    connect()
    console.log("Connected to Backend.")
});

