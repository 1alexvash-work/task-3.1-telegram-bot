import express from "express";

const startExpressServer = () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Express server is listening on port ${port} ✅`);
  });
};

export default startExpressServer;
