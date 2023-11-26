import TelegramBot from "node-telegram-bot-api";
import telegramUserInfo, {
  SupportedSocials,
  supportedSocials,
} from "./models/telegramUserInfo.js";
import validateURL from "./helpers/validateURL.js";
import logger from "./logger.js";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const token = telegramBotToken!;

const listenTelegramWebHooks = () => {
  const bot = new TelegramBot(token, {
    polling: true,
  });

  logger.info("Telegram Bot Webhooks are active ✅");

  bot.onText(/\/start/, async (message) => {
    const chatId = message.chat.id;
    bot.sendMessage(
      chatId,
      "Welcome to the bot! Check what this bot can do with /help"
    );

    try {
      await telegramUserInfo.findOneAndUpdate(
        {
          username: message.chat.username,
        },
        {},
        {
          upsert: true,
        }
      );
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

  bot.onText(/\/about/, async (message) => {
    const chatId = message.chat.id;

    try {
      const userInfo = await telegramUserInfo.findOne({
        username: message.chat.username,
      });

      if (userInfo && userInfo.aboutMe) {
        bot.sendMessage(chatId, `About Me: ${userInfo.aboutMe}`);
      } else {
        bot.sendMessage(
          chatId,
          "About Me information is missing. Set it with /setaboutmeinfo"
        );
      }
    } catch (error) {
      bot.sendMessage(chatId, `Something went wrong: ${error}`);
    }
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

      bot.sendMessage(chatId, "About me info is saved");
    } catch (error) {
      bot.sendMessage(chatId, `Something went wrong: ${error}`);
    }
  });

  bot.onText(/\/links/, async (message) => {
    const chatId = message.chat.id;

    const userInfo = await telegramUserInfo.findOne({
      username: message.chat.username,
    });

    const links = supportedSocials
      .map((social) => {
        const link = userInfo!.socials[social];

        if (link) {
          return `${social}: ${link}`;
        }

        return null;
      })
      .filter((link) => link !== null)
      .join("\n");

    if (links.length > 0) {
      bot.sendMessage(chatId, "Your social links are: \n" + links);
    } else {
      bot.sendMessage(chatId, "No links are set. Set them with /setlinks");
    }
  });

  bot.onText(
    /^\/setlinks(?:\s+(\S+))?(?:\s+(\S+))?$/,
    async (message, match) => {
      const chatId = message.chat.id;
      const social = match && match[1];
      const linkURL = match && match[2];

      if (social === undefined || linkURL === undefined) {
        bot.sendMessage(
          chatId,
          "The format is wrong. Use /setlinks <social> <link>"
        );

        return;
      }

      if (
        supportedSocials.includes(social!.toLowerCase() as SupportedSocials) ===
        false
      ) {
        bot.sendMessage(
          chatId,
          "The social is not supported. Supported socials are: " +
            supportedSocials.join(", ")
        );

        return;
      }

      if (validateURL(linkURL!) === false) {
        bot.sendMessage(chatId, "The link is not valid");

        return;
      }

      try {
        await telegramUserInfo.findOneAndUpdate(
          {
            username: message.chat.username,
          },
          {
            [`socials.${social}`]: linkURL,
          },
          {
            upsert: true,
          }
        );
      } catch (error) {
        bot.sendMessage(chatId, `Something went wrong: ${error}`);
      }

      bot.sendMessage(chatId, "Link is saved");
    }
  );
};

export default listenTelegramWebHooks;
