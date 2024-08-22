import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { TokenModel } from "../models/token.js";
import { sendEmail } from "../utils/sendEmail.js";
import validateSignUp, { validateLogin } from "../utils/AuthValidate.js";
import upload from "../utils/multerConfig.js";

// SignUp

export const signup = async (req, res) => {
  try {
    // Validate request data
    const { error } = validateSignUp(req.body);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullName, username, password, email } = req.body;

    // Check if user already exists
    let user = await UserModel.findOne({
      username,
    });
    // let user = await UserModel.findOne({
    //   $or: [{ username }, { email }],
    // });

    if (user) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new UserModel({
      fullName,
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    // Create and save a verification token
    const token = new TokenModel({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await token.save();

    const url = `${process.env.BASE_URL}api/auth/${newUser._id}/verify/${token.token}`;
    const companyLogoUrl = "https://ibb.co/MB6k5z8"; // Replace with your logo URL

    // Prepare HTML content for email
    const htmlContent = `
    <html>
      <head>
        <style>
          * { box-sizing: border-box; padding: 0; margin: 0; }
          body { font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; }
          .container { width: 100%; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #ffffff; }
          p { color: #4e4949; font-size: 14px; }
          .logo { text-align: center; margin-bottom: 20px; }
          .logo img { width: 150px; height: auto; }
          .content, .content2 { text-align: center; margin-bottom: 20px; }
          .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #9a0000; text-decoration: none; border-radius: 5px; text-align: center; }
          .footer { text-align: center; margin-top: 20px; font-size: 14px; color: #777; }
          @media only screen and (max-width: 600px) {
            .container { padding: 10px; }
            .logo img { width: 120px; }
            .button { padding: 12px 24px; font-size: 14px; }
            p{ font-size: 10px;}

          }
        </style>
      </head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #f9f9f9; padding: 20px">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px; padding: 20px;">
                <tr>
                  <td align="center" style="padding-bottom: 20px">
                    <img src="${companyLogoUrl}" alt="Company Logo" style="width: 150px; height: auto"/>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 20px">
                    <h2 style="margin-bottom: 10px">Verify Your Email</h2>
                    <p style="margin-bottom: 10px">Thank you for signing up with Turcon! Before we can activate your account, we need to verify your email address.</p>
                    <p style="margin-bottom: 10px">Please verify your email by clicking the button below:</p>
                     <a href="${url}" class="button" style="color:white">Verify Email</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 20px">
                    <p style="margin-bottom: 10px">If you did not sign up for a Turcon account, you can ignore this email.</p>
                    <p>Thank you for choosing Turcon, and we look forward to helping you streamline your container solutions!</p>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <p>Best Regards,</p>
                    <p style="font-weight: 600">The Turcon Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;

    // Attempt to send verification email
    try {
      await sendEmail(newUser.email, "Verify Email", htmlContent);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError.message);
      await UserModel.deleteOne({ _id: newUser._id });
      await TokenModel.deleteOne({ _id: token._id });
      return res.status(500).json({
        error:
          "User created but failed to send verification email. Please try again.",
      });
    }
    const userdetail = await UserModel.findById(newUser._id).select(
      "-password -__v"
    );
    console.log(userdetail, "find");

    res.status(201).json({
      userId: newUser._id,
      user: userdetail,
      message:
        "User created successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

//updatemail
export const updateUserEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const { userId } = req.body;
    console.log(newEmail, userId);

    if (!newEmail) {
      return res.status(400).json({ error: "please fill the email" });
    }
    if (!userId) {
      return res.status(400).json({ error: "userId not Found" });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          email: newEmail,
        },
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(400).json({ error: "email not updated" });
    }
    res.status(201).send({ message: "email verified and updated" });
  } catch (error) {
    console.log(error.message, "Error in updateUserEmail controller");
    res.status(400).json({ error: error.message || "internal server error" });
  }
};

//resend mail link

export const resentEmail = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "User ID not found. Please register again." });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Invalid user" });
    }

    let token = await TokenModel.findOne({ userId });

    if (!token) {
      token = new TokenModel({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();
    }

    const url = `${process.env.BASE_URL}api/auth/${user._id}/verify/${token.token}`;
    const companyLogoUrl = "https://ibb.co/MB6k5z8"; // Replace with your logo URL

    // Prepare HTML content for email
    const htmlContent = `
    <html>
      <head>
        <style>
          * { box-sizing: border-box; padding: 0; margin: 0; }
          body { font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; }
          .container { width: 100%; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #ffffff; }
          p { color: #4e4949; font-size: 14px; }
          .logo { text-align: center; margin-bottom: 20px; }
          .logo img { width: 150px; height: auto; }
          .content, .content2 { text-align: center; margin-bottom: 20px; }
          .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #9a0000; text-decoration: none; border-radius: 5px; text-align: center; }
          .footer { text-align: center; margin-top: 20px; font-size: 14px; color: #777; }
          @media only screen and (max-width: 600px) {
            .container { padding: 10px; }
            .logo img { width: 120px; }
            .button { padding: 12px 24px; font-size: 14px; }
            p{ font-size: 10px;}
          }
        </style>
      </head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #f9f9f9; padding: 20px">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px; padding: 20px;">
                <tr>
                  <td align="center" style="padding-bottom: 20px">
                    <img src="${companyLogoUrl}" alt="Company Logo" style="width: 150px; height: auto"/>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 20px">
                    <h2 style="margin-bottom: 10px">Verify Your Email</h2>
                    <p style="margin-bottom: 10px">Thank you for signing up with Turcon! Before we can activate your account, we need to verify your email address.</p>
                    <p style="margin-bottom: 10px">Please verify your email by clicking the button below:</p>
                    <a href="${url}" class="button" style="color:white">Verify Email</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 20px">
                    <p style="margin-bottom: 10px">If you did not sign up for a Turcon account, you can ignore this email.</p>
                    <p>Thank you for choosing Turcon, and we look forward to helping you streamline your container solutions!</p>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <p>Best Regards,</p>
                    <p style="font-weight: 600">The Turcon Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;

    // Attempt to send verification email
    try {
      await sendEmail(user.email, "Verify Email", htmlContent);
      console.log("Sent email");
    } catch (emailError) {
      // Remove token if email sending fails
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
    console.error("Error processing email resend:", error.message);
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
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
      return res
        .status(400)
        .send(`<body><h1 style="text-align:center">Invalid Link<h1/><body/>`);
    }

    // Update user to mark email as verified
    user.verifyEmail = true;
    await user.save();

    // Remove the token
    await TokenModel.deleteOne({ _id: token._id });

    console.log("frontendUrl", process.env.FRONTEND_BASE_URL);

    res.redirect(`${process.env.FRONTEND_BASE_URL}login`);
  } catch (error) {
    console.log("Error in verifyEmail controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

//updatemobile
export const updateUserPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    const { userId } = req.query;

    if (!phone) {
      return res.status(400).json({ error: "please fill the phone" });
    }
    if (!userId) {
      return res.status(400).json({ error: "userId not Found" });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          phone: phone,
          verifyPhone: true,
        },
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(400).json({ error: "phone not updated" });
    }
    res.status(201).send({ message: "phone verified and updated" });
  } catch (error) {
    console.log(error.message, "Error in updateUserPhone controller");
    res.status(400).json({ error: error.message || "internal server error" });
  }
};

//updateDocument
export const updateUserDocument = async (req, res) => {
  // Handle file upload
  upload.single("document")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }

    // Proceed to update user details
    try {
      const { companyName, companyAddress, website, country } = req.body;
      const { userId } = req.query;

      if (!companyName || !companyAddress || !country) {
        return res.status(400).json({
          error: "Company Name, company Address, or Country fields missing",
        });
      }
      if (!userId) {
        return res.status(400).json({ error: "userId not Found" });
      }

      let upperCasedCountry;
      if (country) {
        upperCasedCountry = country.toUpperCase();
      }

      // Prepare update object
      const updateFields = {
        companyAddress,
        companyName,
        country: upperCasedCountry,
        website: website || "",
      };

      // Include file path if file is uploaded
      if (req.file) {
        updateFields.document = req.file.path;
      }

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { updateFields, verifyDocument: true } },
        { new: true }
      );

      if (!user) {
        return res.status(400).json({ error: "User not updated" });
      }
      res.status(201).send({ message: "Company details updated successfully" });
    } catch (error) {
      console.log(error.message, "Error in updateUserDocument controller");
      res.status(400).json({ error: error.message || "Internal server error" });
    }
  });
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

    // Check if phone and document are verified
    if (!user.verifyPhone) {
      return res.status(400).json({
        verify: "phone Not verified",
        step: "phone",
        userId: user._id,
      });
    }
    if (!user.verifyDocument) {
      return res.status(400).json({
        verify: "Document Not verified",
        step: "document",
        userId: user._id,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d", // Token expires in 15 days
    });

    // Update user registration status
    const RegisterCompletedUpdate = await UserModel.findByIdAndUpdate(
      user._id,
      { $set: { registrationComplete: true } },
      { new: true }
    );

    if (!RegisterCompletedUpdate) {
      return res.status(500).json({ error: "User not updated" });
    }

    res.setHeader("X-Auth-Token", token);

    // Send response
    res.status(200).json({
      userId: user._id,
      user: { email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

//logout
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(400).json({ message: "LoggedOut Successfully" });
  } catch (error) {
    console.log(error.message, "Error in logout controller");
    res.status(400).json({ error: error.message || "internal server error" });
  }
};
