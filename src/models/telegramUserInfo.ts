import mongoose, { Schema } from "mongoose";

export type SupportedSocials = "github" | "linkedIn" | "twitter";

export const supportedSocials: SupportedSocials[] = [
  "github",
  "linkedIn",
  "twitter",
];

interface telegramUserInfoModel extends Document {
  username: string;
  aboutMe: string;
  socials: {
    github: SupportedSocials | "";
    linkedIn: SupportedSocials | "";
    twitter: SupportedSocials | "";
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
