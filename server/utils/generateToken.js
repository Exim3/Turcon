import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent xss attacks cross site scripting attacks
    sameSite: "strict", //csrf attack cross site request from forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};
export default generateTokenAndSetCookie;
