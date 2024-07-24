import mongoose from "mongoose";
import sellerModel from "./sellerModel.js";

export const containerSchema = new mongoose.Schema({
  containerNumber: { type: String, required: true },
  size: { type: String, enum: ["20ft", "40ft", "Other"], required: true },
  type: {
    type: String,
    enum: ["Dry", "Refrigerated", "Tank", "Reefers"],
    required: true,
  },
  condition: { type: String, enum: ["New", "Used", "Damaged"], required: true },
  country: { type: String, required: true },
  portLocation: { type: String, required: true },
  price: { type: Number, required: true },
  stockCount: { type: Number, required: true },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: sellerModel,
  },
});

const containerModel = mongoose.model("Container", containerSchema);

export default containerModel;
