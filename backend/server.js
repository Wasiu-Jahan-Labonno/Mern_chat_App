const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const colors = require("colors");
const userRouters = require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

/* app.use(express.json()); //to accept json data */

app.get("/", (req, res) => {
  res.send("API is runing ");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.use("/api/user", (userRouters) => {
  res.send("Api Running successfully");
});

app.get("/api/chat/:id", (req, res) => {
  /* console.log(req.params.id); */
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`server start on pore ${PORT}`.red.bold));
