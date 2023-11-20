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
    console.log(message);

    // bot.sendMessage(message.chat.id, "Welcome to the chat!!!");
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

  bot.onText(/\/help/, (message) => {
    const chatId = message.chat.id;
    bot.sendMessage(
      chatId,
      "This bot stores information about you and your social medias"
    );
  });
};

export default listenTelegramWebHooks;
