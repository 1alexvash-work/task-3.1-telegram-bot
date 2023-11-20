import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import startExpressServer from "./startExpressServer.js";
import connectMongoose from "./connectMongoose.js";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

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

startExpressServer();
connectMongoose();

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
