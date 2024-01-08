const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is runing ");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  /* console.log(req.params.id); */
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`server start on pore ${PORT}`.red.bold));
