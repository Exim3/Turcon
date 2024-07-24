import UserModel from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const User = await UserModel.find({
      _id: { loggedInUserId },
    }).select("-password");

    res.status(201).json(User);
  } catch (error) {
    console.log("Error in getUsersForSideBar : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
