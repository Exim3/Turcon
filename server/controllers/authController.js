import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import crypto from "crypto";
import { TokenModel } from "../models/token.js";
import { sendEmail } from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, email } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password do not match" });
    }
    let user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "username is already exits",
      });
    }

    //HASHED PASSWORD HERE
    const salt = await bcrypt.genSalt(Number(process.env.salt));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      fullName,
      username,
      password: hashedPassword,
      email,
    });

    if (newUser) {
      //generate jwt token
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      const token = await new TokenModel({
        userId: newUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`;
      await sendEmail(newUser.email, "Verify Email", url);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        message: "An Email sent to your Account please verify",
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log(error.message, "Error in signup controller");
    res.status(400).json({ error: error.message || "internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const userId = req.params.id;
    const tokenId = req.params.token;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }
    const token = await TokenModel.find({ userId: userId, token: tokenId });
    if (!token) {
      return res.status(400).json({ message: "Invalid Link" });
    }

    await UserModel.findByIdAndUpdate(
      userId,
      {
        verifyEmail: true,
      },
      { new: true }
    );

    await token.remove();

    res.status(200).send({ message: "Email Verified successfully" });
  } catch (error) {
    console.log(error.message, "Error in verifyEmail controller");
    res.status(400).json({ error: error.message || "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordValid) {
      return res.status(400).json({ error: "Invalid Username Or Password" });
    }

    if (!user.verifyEmail) {
      let token = await TokenModel.find({ userId: user._id });
      if (!token) {
        const token = await new TokenModel({
          userId: newUser._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`;
        await sendEmail(newUser.email, "Verify Email", url);
      }
      return res
        .status(200)
        .send({ message: "An Email sent to your Account please verify" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error.message, "Error in login controller");
    res.status(400).json({ error: error.message || "internal server error" });
  }
  console.log("login route");
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(400).json({ message: "LoggedOut Successfully" });
  } catch (error) {
    console.log(error.message, "Error in logout controller");
    res.status(400).json({ error: error.message || "internal server error" });
  }
  console.log("logout route");
};
