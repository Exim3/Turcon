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
      minlength: 6,
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },

    email: {
      type: String,
      require: true,
    },
  },
  //createdAt ,updatedAt
  { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
