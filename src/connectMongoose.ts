import mongoose from "mongoose";
import logger from "./logger.js";

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ovflcai.mongodb.net/`;

const connectMongoose = async () => {
  try {
    await mongoose.connect(DB_URL);

    logger.info("MongoDB ✅");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
  }
};

export default connectMongoose;
