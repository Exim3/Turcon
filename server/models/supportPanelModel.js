import mongoose from "mongoose";

const supportPanelSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: ["sales", "purchase", "finance", "superadmin"],
      required: true,
    },
  },
  //createdAt ,updatedAt
  { timestamps: true }
);

export const SupportPanelModel = mongoose.model(
  "supportpanel",
  supportPanelSchema
);
