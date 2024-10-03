import jwt from "jsonwebtoken";
import { SupportPanelModel } from "../models/supportPanelModel.js";

const protectAdminRoute = async (req, res, next) => {
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

    // Decode and verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await SupportPanelModel.findById(decoded.id).select(
        "-password"
      );

      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized - User not found" });
      }

      if (req.user.role !== "superadmin") {
        return res.status(403).json({ error: "Forbidden - Admin access only" });
      }

      next();
    } catch (err) {
      console.error("Error verifying token:", err.message);
      res.status(401).json({ error: "Unauthorized - Invalid token signature" });
    }
  } catch (error) {
    console.error("Error in protectAdminRoute middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectAdminRoute;
