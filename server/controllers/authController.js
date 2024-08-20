import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie, {
  generateTokenAndSetHeader,
} from "../utils/generateToken.js";
import crypto from "crypto";
import { TokenModel } from "../models/token.js";
import { sendEmail } from "../utils/sendEmail.js";
import validateSignUp, { validateLogin } from "../utils/AuthValidate.js";

export const signupO = async (req, res) => {
  let newUser;
  let token;
  try {
    const { fullName, username, password, email } = req.body;

    // Check if username already exists
    let user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    newUser = new UserModel({
      fullName,
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    // Generate JWT token and set it as a cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Create and save a new verification token
    token = await new TokenModel({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    // Construct verification URL
    const url = `${process.env.BASE_URL}api/auth/${newUser._id}/verify/${token.token}`;
    console.log("Verification URL:", url);

    // Attempt to send verification email
    try {
      await sendEmail(
        newUser.email,
        "Verify Email",
        `Please verify your email by clicking this link: ${url}`
      );
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError.message);
      await UserModel.deleteOne({ _id: newUser._id });
      await TokenModel.deleteOne({ _id: token._id });
      return res.status(500).json({
        error:
          "User created but failed to send verification email. Please try again.",
      });
    }

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      message:
        "An email has been sent to your account. Please verify your email.",
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// SignUp

export const signup = async (req, res) => {
  try {
    const { error } = validateSignUp(req.body);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }
    const { fullName, username, password, email } = req.body;

    //is user already exists check
    let user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = new UserModel({
      fullName,
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      message: "Registration details collected. Please complete the process.",
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid Username Or Password" });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Username Or Password" });
    }

    if (!user.verifyPhone) {
      return res.status(400).json({ verify: "phone Not verified", step: 2 });
    }
    if (!user.verifyDocument) {
      return res.status(400).json({ verify: "Document Not verified", step: 4 });
    }
    if (!user.verifyEmail) {
      return res.status(400).json({ verify: "email Not verified", step: 5 });
    }

    //after successfull

    // Generate JWT token and set it as a headers
    generateTokenAndSetHeader(user._id, res);

    res.status(200).json({
      userId: user._id,
      fullName: user.fullName,
      username: user.username,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const login0 = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid Username Or Password" });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Username Or Password" });
    }

    // Check if the user's email is verified
    if (!user.verifyEmail) {
      let token = await TokenModel.findOne({ userId: user._id });
      console.log("send email");

      if (!token) {
        token = await new TokenModel({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}api/auth/${user._id}/verify/${token.token}`;
        console.log("Verification URL:", url);
        console.log("sending email");

        try {
          await sendEmail(
            user.email,
            "Verify Email",
            `Please verify your email by clicking this link login: ${url}`
          );
          console.log("sent email");
        } catch (emailError) {
          console.log("not send email");

          console.error(
            "Failed to send verification email:",
            emailError.message
          );
          await TokenModel.deleteOne({ _id: token._id });
          return res.status(500).json({
            error: "Failed to send verification email. Please try again later.",
          });
        }
      }

      try {
        const url = `${process.env.BASE_URL}api/auth/${user._id}/verify/${token.token}`;
        await sendEmail(
          user.email,
          "Verify Email",
          `Please verify your email by clicking this link login: ${url}`
        );
        console.log("sent email");
      } catch (emailError) {
        console.log("not send email");

        console.error("Failed to send verification email:", emailError.message);
        await TokenModel.deleteOne({ _id: token._id });
        return res.status(500).json({
          error: "Failed to send verification email. Please try again later.",
        });
      }
      return res.status(200).json({
        message:
          "An email has been sent to your account. Please verify your email.",
      });
    }

    // Generate JWT token and set it as a cookie
    generateTokenAndSetCookie(user._id, res);

    // Respond with user details
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
//verify-Email
export const verifyEmail = async (req, res) => {
  try {
    const userId = req.params.id;
    const tokenId = req.params.token;

    // Find the user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }

    // Find the token by userId and token
    const token = await TokenModel.findOne({ userId: userId, token: tokenId });
    if (!token) {
      return res.status(400).json({ message: "Invalid link" });
    }

    // Update user to mark email as verified
    user.verifyEmail = true;
    await user.save();

    // Remove the token
    await TokenModel.deleteOne({ _id: token._id });

    res.status(200).send("<body>verified successfully<body/>");
  } catch (error) {
    console.log("Error in verifyEmail controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
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
