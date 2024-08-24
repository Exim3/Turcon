import express from "express";
import {
  addCart,
  deleteCart,
  getCartById,
  updateCart,
} from "../controllers/cartController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/addcart", protectRoute, addCart);
router.get("/getcart", protectRoute, getCartById);
router.delete("/deletecart", protectRoute, deleteCart);
router.put("/updatecart", protectRoute, updateCart);

export default router;
