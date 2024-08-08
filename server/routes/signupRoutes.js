import express from "express";
import { otpMobile, Register } from "../controllers/signupController.js";

const router = express.Router();
router.post("/post", Register);
router.post("/mobile", otpMobile);
export default router;
