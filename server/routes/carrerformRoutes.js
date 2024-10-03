import express from "express";
import {
  addCarrerForm,
  getCarrerForm,
} from "../controllers/carrerController.js";
const router = express.Router();

router.post("/post", addCarrerForm);
router.get("/get", getCarrerForm);

export default router;
