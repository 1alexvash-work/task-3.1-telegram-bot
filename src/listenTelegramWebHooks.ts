// TODO:
// figure out regex for /setaboutmeinfo with and without arguments
// save the data to the database
// implement /start command

import TelegramBot from "node-telegram-bot-api";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const token = telegramBotToken!;

const listenTelegramWebHooks = () => {
  const bot = new TelegramBot(token, {
    polling: true,
  });

  console.log("Telegram Bot Webhooks are active ✅");

  // Listen for any kind of message
  bot.on("message", (message) => {
    // console.log('message:', message)
    // bot.sendMessage(message.chat.id, "Welcome to the chat!!!");
  });

  bot.onText(/^\/setaboutmeinfo(?:\s+(.+))?$/, (message, match) => {
    const chatId = message.chat.id;
    const response = match && match[1]; // this will contain the arguments passed to the command
    console.log("response:", response);
    // you can now use 'response' to process the arguments
  });

  bot.onText(/\/help/, (message) => {
    const chatId = message.chat.id;
    bot.sendMessage(
      chatId,
      "This bot stores information about you and your social medias"
    );
  });
};

export default listenTelegramWebHooks;
