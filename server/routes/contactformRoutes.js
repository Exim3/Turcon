import express from "express";
import {
  addContactForm,
  getContactForm,
} from "../controllers/contactController.js";
const router = express.Router();

router.post("/post", addContactForm);
router.get("/get", getContactForm);

export default router;
