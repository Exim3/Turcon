import mongoose from "mongoose";
import sellerModel from "./sellerModel.js";

export const containerSchema = new mongoose.Schema({
  containerNumber: { type: String, required: true },
  size: {
    type: String,
    enum: ["20FT", "40FT", "20FT HC", "40FT HC"],
    required: true,
  },
  type: {
    type: String,
    enum: ["DRY", "OPENTOP", "FLATRACK", "TANKS", "REEFERS"],
    required: true,
  },
  condition: {
    type: String,
    enum: [
      "NEW",
      "USED",
      "DAMAGED",
      "SCRAP",
      "IICL",
      "WWT",
      "ASIS",
      "CARGOWORTHY",
    ],
    required: true,
  },
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
