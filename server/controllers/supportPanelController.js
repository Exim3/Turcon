import {
  validateAdminSignUp,
  validateLogin,
  validateResetPassword,
} from "../utils/AuthValidate.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SupportPanelModel } from "../models/supportPanelModel.js";
import { TokenModel } from "../models/token.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { Types } from "mongoose";

export const signup = async (req, res) => {
  try {
    // Validate request data
    const { error } = validateAdminSignUp(req.body);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullName, username, password, email, role, phone } = req.body;

    let user = await SupportPanelModel.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new SupportPanelModel({
      fullName,
      username,
      password: hashedPassword,
      email,
      phone,
      role,
    });
    await newUser.save();
    if (!newUser)
      return res.status(400).json({ error: "Register Unsuccessfull" });
    res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error in AdminSignup Controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;

    // Find the user by username
    const user = await SupportPanelModel.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid Username Or email" });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15d", // Token expires in 15 days
      }
    );
    res.setHeader("X-Admin-Token", token);

    // Send response
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "userId missing" });
    const user = await SupportPanelModel.findById(userId).select(
      "-password -__v"
    );
    if (!user) return res.status(400).json({ error: "Invalid User" });

    // Send response
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error in getAdmin controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "please fill the email" });
    console.log(email, "hi");

    const user = await SupportPanelModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid Email Address" });
    let token = await TokenModel.findOne({ userId: user._id });

    if (!token) {
      token = new TokenModel({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();
    }
    const url = `${process.env.BASE_URL}/api/admin/${user._id}/verifyforgetpassword/${token.token}`;
    const companyLogoUrl = `${process.env.FRONTEND_BASE_URL}/logo.png`;
    const htmlContent = `<html>
  <head>
    <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      body {
        font-family: Arial, sans-serif;
        color: #333;
        padding: 20px;
        background-color: #f9f9f9;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #ffffff;
      }
      p {
        color: #4e4949;
        font-size: 14px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo img {
        width: 150px;
        height: auto;
      }
      .content,
      .content2 {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        background-color: #9a0000;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #777;
      }
      @media only screen and (max-width: 600px) {
        .container {
          padding: 10px;
        }
        .logo img {
          width: 120px;
        }
        .button {
          padding: 12px 24px;
          font-size: 14px;
        }
        p {
          font-size: 10px;
        }
      }
    </style>
  </head>
  <body>
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      align="center"
      style="background-color: #f9f9f9; padding: 20px"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              background-color: #ffffff;
              border: 1px solid #ddd;
              border-radius: 5px;
              padding: 20px;
              padding-inline:56px;
            "
          >
            <tr>
              <td align="center" style="padding-bottom: 20px">
                <img
                  src="${companyLogoUrl}"
                  alt="Company Logo"
                  style="width: 150px; height: auto"
                />
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 20px">
                <h2 style="margin-bottom: 10px">Request for Reset Password</h2>
                <p style="margin-bottom: 24px">
                  We noticed you requested to reset your password. Click the
                  link below to create a new password.
                </p>

                <a href="${url}" class="button" style="color: white"
                  >Reset Password</a
                >
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 20px">
                <p style="margin-bottom: 10px">
                  If you did not request a password reset or do not have a
                  Turcon account, you can safely ignore this email.
                </p>
                <p style="margin-bottom: 10px">
                  Thank you for choosing Turcon, and we look forward to helping
                  you streamline your container solutions!
                </p>
              </td>
            </tr>
            <tr>
              <td align="left">
                <p style="margin-bottom: 5px">Best Regards,</p>
                <p style="font-weight: 600">The Turcon Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
    try {
      await sendEmail(user.email, "Request For Reset Password ", htmlContent);
    } catch (emailError) {
      await TokenModel.deleteOne({ _id: token._id });
      return res.status(500).json({
        error: "Failed to send verification email. Please try again later.",
      });
    }
    return res.status(200).json({
      message:
        "An email has been sent to your account. Please verify your email.",
    });
  } catch (error) {
    console.error("Error in forgetPassword controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const verifyForgetPassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const tokenId = req.params.token;

    // Find the user by ID
    const user = await SupportPanelModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }

    // Find the token by userId and token
    const token = await TokenModel.findOne({ userId: userId, token: tokenId });
    if (!token) {
      return res
        .status(400)
        .send(`<body><h1 style="text-align:center">Invalid Link<h1/><body/>`);
    }

    // Remove the token
    await TokenModel.deleteOne({ _id: token._id });

    res.redirect(`${process.env.ADMIN_BASE_URL}/changepassword/${userId}`);
  } catch (error) {
    console.error("Error in verifyEmail controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { error } = validateResetPassword(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { password, userId } = req.body;
    if (!password)
      return res.status(400).json({ error: "Password is required" });

    // Validate userId format
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User" });
    }

    const user = await SupportPanelModel.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.save();

    return res.status(200).json({
      message: "Your Password has been successfully reset",
    });
  } catch (error) {
    console.error("Error in forgetPassword controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
