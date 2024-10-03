import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/AuthValidate.js";

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.query;

    const User = await UserModel.findById(userId).select(
      "-password -verifyEmail -verifyPhone -verifyDocument -__v"
    );
    if (!User) {
      return res.status(400).json({ error: "Id Not Found" });
    }

    res.status(201).json(User);
  } catch (error) {
    console.error("Error in getUser : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateUserById = async (req, res) => {
  try {
    const { userId } = req.query;

    const { fullName, companyName, companyAddress, country, telephone } =
      req.body;

    if (!userId) {
      return res.status(400).json({ error: "UserId required" });
    }

    const User = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { fullName, companyName, companyAddress, country, telephone },
      },
      {
        new: true,
      }
    );
    if (!User) return res.status(400).json({ error: "User not found" });
    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error in updateUserById: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const user = req.user;
    const userId = user?._id;

    if (!userId) return res.status(400).json({ error: "User ID not found" });
    const { error } = validatePassword(req.body);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const userRecord = await UserModel.findById(userId);
    if (!userRecord) return res.status(404).json({ error: "User not found" });

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      userRecord.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "current password not matches" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser)
      return res.status(500).json({ error: "Password not updated" });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { username, page = 0, rowsPerPage = 10 } = req.query;

    // Validate query parameters
    const pageNumber = Number(isNaN(page) ? 0 : page);
    const limit = Number(isNaN(rowsPerPage) ? 10 : rowsPerPage);

    // Construct the filter
    let filter = {};
    if (username) {
      filter.username = { $regex: username, $options: "i" }; // Case-insensitive search
    }

    // Get total count
    const totalUsers = await UserModel.countDocuments(filter);

    // Construct the aggregation pipeline
    let pipeline = [
      { $match: filter },
      {
        $project: {
          _id: 1,
          username: 1,
          fullName: 1,
          email: 1,
          phone: 1,
          country: 1,
          companyAddress: 1,
          companyName: 1,
          // Add other fields if needed
        },
      },
      {
        $sort: { createdAt: -1 }, // Ensure you have 'createdAt' field in UserModel
      },
      {
        $skip: pageNumber * limit,
      },
      {
        $limit: limit,
      },
    ];

    // Execute the aggregation pipeline
    const users = await UserModel.aggregate(pipeline);

    return res.status(200).json({ users, totalUsers });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
