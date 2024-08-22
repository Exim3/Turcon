import express from "express";
import {
  login,
  logout,
  resentEmail,
  signup,
  updateUserDocument,
  updateUserEmail,
  updateUserPhone,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.put("/signup/updatemail", updateUserEmail);
router.post("/signup/resentmail", resentEmail);
router.get("/:id/verify/:token", verifyEmail);
router.put("/signup/updatephone", updateUserPhone);
router.put("/signup/updatedocument", updateUserDocument);
router.post("/login", login);
router.post("/logout", logout);

export default router;
