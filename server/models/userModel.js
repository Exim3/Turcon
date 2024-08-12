import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
    },
    otp: {
      type: Number,
      maxlength: 4,
    },
    companyName: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    country: {
      type: String,
    },
    website: {
      type: String,
    },
    document: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  //createdAt ,updatedAt
  { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
