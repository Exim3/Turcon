import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
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

const ContactFormModel = mongoose.model("contactform", contactSchema);

export default ContactFormModel;
