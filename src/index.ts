import "dotenv/config";

import listenTelegramWebHooks from "./listenTelegramWebHooks.js";
import startExpressServer from "./startExpressServer.js";
import connectMongoose from "./connectMongoose.js";

listenTelegramWebHooks();
startExpressServer();
connectMongoose();
