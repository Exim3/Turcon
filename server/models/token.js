import mongoose, { Schema } from "mongoose";
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "UserModel",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

export const TokenModel = mongoose.model("token", tokenSchema);
