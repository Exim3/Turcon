import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderId,
  getOrderUserId,
  updateOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/getbyuser", getOrderUserId);
router.get("/getallorders", getAllOrders);
router.get("/getbyid", getOrderId);
router.put("/updatebyid", updateOrderById);

export default router;
