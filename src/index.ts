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
