import express from "express";
import {
  addContainer,
  deleteContainer,
  getContainer,
  updateContainer,
} from "../controllers/containerController.js";

const router = express.Router();

router.get("/get", getContainer);
router.post("/add/:sellerId", addContainer);
router.put("/update/:containerId", updateContainer);
router.delete("/delete/:containerId", deleteContainer);
export default router;
