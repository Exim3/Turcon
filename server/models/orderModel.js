import mongoose from "mongoose";

import { CartSchema } from "./userCartModel.js";
import UserModel from "./userModel.js";

export const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        type: CartSchema,
        required: true,
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["card", "bank"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "done"],
      required: true,
      default: "pending",
    },
    bookingId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
    },
    orderStatus: {
      type: String,
      enum: ["processing", "invoice", "cancelled", "collected", "proforma"],
      required: true,
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
