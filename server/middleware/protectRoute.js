import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }

      const user = await UserModel.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ error: "Unauthorized - User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Token Verification Error:", err.message);
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
  } catch (error) {
    console.error("Error in protectedRoute middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
