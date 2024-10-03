import mongoose from "mongoose";
import sellerModel from "./sellerModel.js";

export const containerSchema = new mongoose.Schema(
  {
    containerNumber: { type: String },
    size: {
      type: String,
      enum: [
        "20'FT",
        "40'FT",
        "45'FT",
        "20'FT HC",
        "40'FT HC",
        "45'FT HC",
        "45'FT HC PW",
      ],
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
  },
  {
    timestamps: true,
  }
);

const containerModel = mongoose.model("Container", containerSchema);

export default containerModel;
