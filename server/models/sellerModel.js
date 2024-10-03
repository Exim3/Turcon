import mongoose from "mongoose";

export const sellerSchema = new mongoose.Schema(
  {
    sellerName: { type: String, required: true },
    address: { type: String, required: true },
    contactPerson: [{ type: mongoose.Schema.Types.ObjectId }],
    containers: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const sellerModel = mongoose.model("Seller", sellerSchema);

export default sellerModel;
