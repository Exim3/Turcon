import express from "express";
import protectAdminRoute from "../middleware/protectAdminRoute.js";
import {
  forgetPassword,
  getAdmin,
  login,
  resetPassword,
  signup,
  verifyForgetPassword,
} from "../controllers/supportPanelController.js";

const router = express.Router();

router.post("/signup", protectAdminRoute, signup);
router.post("/login", login);
router.get("/get", getAdmin);
router.get("/:id/verifyforgetpassword/:token", verifyForgetPassword);
router.post("/forgetpassword", forgetPassword);
router.put("/resetpassword", resetPassword);

export default router;
