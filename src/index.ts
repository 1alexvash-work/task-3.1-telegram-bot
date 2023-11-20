import "dotenv/config";

import listenTelegramWebHooks from "./listenTelegramWebHooks.js";
import startExpressServer from "./startExpressServer.js";
import connectMongoose from "./connectMongoose.js";

listenTelegramWebHooks();
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
// * Implement /help command - [x]
// * Refactor the code into modules, as a bonus - [x]
