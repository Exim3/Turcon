import mongoose from "mongoose";

export const personSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ContactpersonModel = mongoose.model("Contactperson", personSchema);

export default ContactpersonModel;
