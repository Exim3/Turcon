import express from "express";
import {
  addSeller,
  addSellerContainer,
  deleteSeller,
  getSellerById,
  getSellerContainer,
  getTotalSellers,
  updateContainerOfSeller,
  updateSeller,
} from "../controllers/sellerController.js";
const router = express.Router();

router.get("/get", getTotalSellers);
router.get("/getseller", getSellerById);
router.get("/getsellercontainer", getSellerContainer);
router.post("/add", addSeller);
router.post("/addcontainers/:sellerId", addSellerContainer);
router.put("/updateseller/:sellerId", updateSeller);
router.put("/updatecontainer", updateContainerOfSeller);
router.delete("/deleteseller", deleteSeller);

export default router;
