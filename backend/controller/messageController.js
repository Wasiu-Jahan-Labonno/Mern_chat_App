const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chats: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate([
      { path: "sender", select: "name pic" },
      { path: "chats" },
    ]);
    message = await User.populate(message, {
      path: "chats.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chats: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chats");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessage };
