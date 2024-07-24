import express from "express";
import {
  addSeller,
  addSellerContainer,
  deleteSeller,
  getSellerById,
  getTotalSellers,
  updateContainerOfSeller,
  updateSeller,
} from "../controllers/sellerController.js";
const router = express.Router();

router.get("/get", getTotalSellers);
router.get("/getseller/:sellerId", getSellerById);
router.post("/add", addSeller);
router.post("/addcontainers/:sellerId", addSellerContainer);
router.put("/updateseller/:sellerId", updateSeller);
router.put("/updatecontainer/:sellerId", updateContainerOfSeller);
router.delete("/deleteseller/:sellerId", deleteSeller);

export default router;
