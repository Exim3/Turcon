import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    req.user = user;
    // console.log(user, req.user, "===protected");

    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
