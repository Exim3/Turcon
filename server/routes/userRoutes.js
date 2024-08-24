import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
import {
  getUserById,
  resetPassword,
  updateUserById,
} from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// router.get("/", protectRoute, getUser);
router.get("/", protectRoute, getUserById);
router.put("/", protectRoute, updateUserById);
router.put("/resetpassword", protectRoute, resetPassword);

export default router;
