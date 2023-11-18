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

// Set express server on the port 3000
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

// Create mongoose connection to MongoDB
import mongoose from "mongoose";

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ovflcai.mongodb.net/`;

try {
  await mongoose.connect(DB_URL);
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// Increease the counter value
import Counter from "./models/Counter.js";

const counterName = "foxMindedTask";
await Counter.findOneAndUpdate(
  {
    name: counterName,
  },
  {
    $inc: {
      count: 1,
    },
  },
  {
    upsert: true,
    new: true,
  }
);

app.get("/counter/state", async (req, res) => {
  const counter = await Counter.findOne({
    name: counterName,
  });

  res.json({ counter });
});

app.get("/counter/increment", async (req, res) => {
  await Counter.findOneAndUpdate(
    {
      name: counterName,
    },
    {
      $inc: {
        count: 1,
      },
    }
  );

  res.send("Counter value was incremented");
});

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
