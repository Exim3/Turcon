import express from "express";
import {
  addCart,
  deleteCart,
  getCartById,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/addcart", addCart);
router.get("/getcart", getCartById);
router.delete("/deletecart", deleteCart);
router.put("/updatecart", updateCart);

export default router;
