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
  console.log("Detected new chat member:");
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

// TODOs: Final todos:
// * Find an appropriate event to trigger when user joins the chat for the first time - []
// * Implement schema creation on user bot sign up - []
// * Implement /setaboutmeinfo command - []
// * Implement /aboutme command - []
// * Implement socials command - []
// * Add helper for URL validation - []
//   - Implement /setgithub command - []
//   - Implement /setlinkedin command - []
//   - Implement /settwitter command - []
// * Implement /help command - []
// * Refactor the code into modules, as a bonus - []
