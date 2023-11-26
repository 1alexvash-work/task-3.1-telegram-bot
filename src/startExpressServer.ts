import express from "express";
import logger from "./logger.js";

const startExpressServer = () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    logger.info(`Express server is listening on port ${port} ✅`);
  });
};

export default startExpressServer;
