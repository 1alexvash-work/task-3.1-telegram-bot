import mongoose, { Schema } from "mongoose";

interface telegramUserInfoModel extends Document {
  username: string;
  aboutMe: string;
  socials: {
    github: string;
    linkedIn: string;
    twitter: string;
  };
}

const telegramUserInfoSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  aboutMe: {
    type: String,
    required: true,
    default: "",
  },
  socials: {
    github: {
      type: String,
      required: false,
      default: "",
    },
    linkedIn: {
      type: String,
      required: false,
      default: "",
    },
    twitter: {
      type: String,
      required: false,
      default: "",
    },
  },
});

const telegramUserInfo = mongoose.model<telegramUserInfoModel>(
  "telegramUserInfo",
  telegramUserInfoSchema
);

export default telegramUserInfo;
