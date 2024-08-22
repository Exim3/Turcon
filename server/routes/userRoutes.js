import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
import { getUserById } from "../controllers/userController.js";

const router = express.Router();

// router.get("/", protectRoute, getUser);
router.get("/", getUserById);

export default router;
