import "dotenv/config";

console.log("Telegram Bot: is listening...");

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

import TelegramBot from "node-telegram-bot-api";
const token = telegramBotToken!;
const bot = new TelegramBot(token, {
  polling: true,
});

// Listen for any kind of message
bot.on("message", (message) => {
  console.log(message);
});

// Listen for when a user joins the chat
bot.on("new_chat_members", (message) => {
  console.log(message);
});

// set express server on the port 3000
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

// create mongoose connection to MongoDB
import mongoose from "mongoose";

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ovflcai.mongodb.net/`;

try {
  await mongoose.connect(DB_URL);
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// Todos
// * Create a MongoDB Atlas account - [x]
// * Create a database - [x]
// * Create a test counter collection - [ ]

// * Transform http server to Express - [x]
// * Connect to MongoDB via Mongoose - [x]
// * Express server serves:
//   - Page retrieving the counter value - [ ]
//   - Page incrementing the counter value - [ ]

// * Telegram bot:
//   - Add the command to set social links - [ ]
//   - Create some MongoDB collection to save this data in the proper collection - [ ]
//   - Listen to webhooks when this data is requested and send the data back - [ ]
//   - URL link validation
//     - In case of error, send a message to the user - [ ]
//     - In case of success, send a message to the user - [ ]
