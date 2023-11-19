import "dotenv/config";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

import TelegramBot from "node-telegram-bot-api";

const token = telegramBotToken!;
const bot = new TelegramBot(token, {
  polling: true,
});

console.log("Telegram Bot Webhooks are active ✅");

// Listen for any kind of message
bot.on("message", (message) => {
  console.log(message);

  // bot.sendMessage(message.chat.id, "Welcome to the chat!!!");
});

// Listen for when a user joins the chat
bot.on("new_chat_members", (message, metadata) => {
  console.log({
    message,
    metadata,
  });
});

bot.onText(/\/setaboutmeinfo (.+)/, (message, match) => {
  const chatId = message.chat.id;
  const response = match && match[1];

  if (response) {
    bot.sendMessage(
      chatId,
      "Your information has been saved successfully. Use /aboutme to see it."
    );
  }
});

bot.onText(/\/setaboutmeinfo/, (message) => {
  const chatId = message.chat.id;
  bot.sendMessage(
    chatId,
    "Please provide with some information about yourself after /setaboutmeinfo command"
  );
});

import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port} ✅`);
});

import mongoose from "mongoose";

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ovflcai.mongodb.net/`;

try {
  await mongoose.connect(DB_URL);
  console.log("MongoDB ✅");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// Todos
// * Create a MongoDB Atlas account - [x]
// * Create a database - [x]
// * Allow access to db from all IPs - [x]
// * Create a test counter collection - [x]

// * Transform http server to Express - [x]
// * Connect to MongoDB via Mongoose - [x]
// * Express server serves:
//   - Page retrieving the counter value - [x]
//   - Page incrementing the counter value - [x]

// * Telegram bot:
//   - Add the command to set social links - [ ]
//   - Create some MongoDB collection to save this data in the proper collection - [ ]
//   - Listen to webhooks when this data is requested and send the data back - [ ]
//   - URL link validation
//     - In case of error, send a message to the user - [ ]
//     - In case of success, send a message to the user - [ ]
