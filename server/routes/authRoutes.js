import express from "express";
import {
  forgetPassword,
  login,
  resentEmail,
  resetPassword,
  signup,
  updateUserDocument,
  updateUserEmail,
  updateUserPhone,
  verifyEmail,
  verifyForgetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.put("/signup/updatemail", updateUserEmail);
router.post("/signup/resentmail", resentEmail);
router.get("/:id/verify/:token", verifyEmail);
router.get("/:id/verifyforgetpassword/:token", verifyForgetPassword);
router.put("/signup/updatephone", updateUserPhone);
router.put("/signup/updatedocument", updateUserDocument);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);
router.put("/resetpassword", resetPassword);

export default router;
