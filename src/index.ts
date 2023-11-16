import "dotenv/config";

console.log("Hello world!");

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
console.log("telegramBotToken:", telegramBotToken);

// Bing example

import TelegramBot from "node-telegram-bot-api";
const token = telegramBotToken!;
const bot = new TelegramBot(token, {
  polling: true,
});

// Listen for any kind of message
bot.on("message", (msg) => {
  console.log(msg);
});

// Listen for when a user joins the chat
bot.on("new_chat_members", (msg) => {
  console.log(msg);
});
