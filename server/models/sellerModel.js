import mongoose from "mongoose";
import containerModel, { containerSchema } from "./containerModel.js";

export const sellerSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  phone: { type: String, required: true },
  containers: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const sellerModel = mongoose.model("Seller", sellerSchema);

export default sellerModel;
