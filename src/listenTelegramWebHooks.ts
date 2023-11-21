// TODO:
// figure out regex for /setaboutmeinfo with and without arguments
// save the data to the database
// implement /start command

import TelegramBot from "node-telegram-bot-api";
import telegramUserInfo from "./models/telegramUserInfo.js";

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

  bot.onText(/^\/setaboutmeinfo(?:\s+(.+))?$/, async (message, match) => {
    const chatId = message.chat.id;
    const response = match && match[1];

    if (response === undefined) {
      bot.sendMessage(
        chatId,
        "You need to provide some information about yourself"
      );
      return;
    }

    try {
      await telegramUserInfo.findOneAndUpdate(
        {
          username: message.chat.username,
        },
        {
          aboutMe: response,
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      bot.sendMessage(chatId, `Something went wrong: ${error}`);
    }
  });

  bot.onText(/\/start/, async (message) => {
    const chatId = message.chat.id;
    bot.sendMessage(
      chatId,
      "Welcome to the bot! Check what this bot can do with /help"
    );

    try {
      const result = await telegramUserInfo.findOneAndUpdate(
        {
          username: message.chat.username,
        },
        {},
        {
          upsert: true,
        }
      );

      console.log("result:", result);
    } catch (error) {
      bot.sendMessage(chatId, `Something went wrong: ${error}`);
    }
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
