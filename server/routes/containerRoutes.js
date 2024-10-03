import express from "express";
import {
  addContainer,
  deleteContainer,
  getAllContainer,
  getContainerPageWise,
  getCountryPort,
  getSelectedContainerPageWise,
  updateContainer,
} from "../controllers/containerController.js";

const router = express.Router();

router.get("/getallcontainer", getAllContainer);
router.get("/getcountry", getCountryPort);
router.get("/getpagewise", getContainerPageWise);
router.get("/getselected", getSelectedContainerPageWise);
router.post("/add/:sellerId", addContainer);
router.put("/update/:containerId", updateContainer);
router.delete("/delete/:containerId", deleteContainer);
export default router;
