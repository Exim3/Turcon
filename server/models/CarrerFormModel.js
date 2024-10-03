import mongoose from "mongoose";

const carrerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
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
    message: {
      type: String,
      default: "no messages",
    },

    department: {
      type: String,
      enum: ["sales", "support", "enquiry"],
      required: true,
    },
  },
  //createdAt ,updatedAt
  { timestamps: true }
);

const CarrerFormModel = mongoose.model("carrerform", carrerSchema);

export default CarrerFormModel;
