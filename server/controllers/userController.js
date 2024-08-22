import UserModel from "../models/userModel.js";

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.query;

    const User = await UserModel.findById(userId).select(
      "-password -verifyEmail -verifyPhone -verifyDocument -__v"
    );

    res.status(201).json(User);
  } catch (error) {
    console.log("Error in getUser : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
