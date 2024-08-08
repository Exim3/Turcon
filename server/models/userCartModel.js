import mongoose from "mongoose";

const CartSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    portLocation: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    stockCount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    itemcount: {
      type: Number,
      default: 1, // Provide a default value if needed
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

CartSchema.index({ userId: 1 });
CartSchema.index({ sellerId: 1 });

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
