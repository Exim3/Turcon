// import jwt from "jsonwebtoken";

// // export const generateTokenAndSetCookie = (userId, res) => {
// //   const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
// //     expiresIn: "15d",
// //   });

// //   res.cookie("jwt", token, {
// //     maxAge: 15 * 24 * 60 * 60 * 1000,
// //     httpOnly: true,
// //     sameSite: "strict",
// //     secure: process.env.NODE_ENV !== "development",
// //   });
// //   console.log(token, "myloginToken");
// // };

import jwt from "jsonwebtoken";

// Function to generate a JWT token
export const generateToken = (userId) => {
  // Generate a token with userId and an expiration time
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d", // Token expires in 15 days
  });
  return token;
};

// Function to verify a JWT token
export const verifyToken = (token) => {
  try {
    // Verify the token and return the decoded information
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// Function to set the token in response headers
export const setTokenHeader = (token, res) => {
  res.setHeader("Authorization", `Bearer ${token}`);
};
