import mongoose from "mongoose";

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ovflcai.mongodb.net/`;

const connectMongoose = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongoose;
