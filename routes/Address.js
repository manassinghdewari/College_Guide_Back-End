import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controllers/address.js";
import { verifyCollege } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/:collegeId", verifyCollege, createAddress);

router.put("/:id", verifyCollege, updateAddress);

router.delete("/:id/:collegeId", verifyCollege, deleteAddress);

router.get("/:id", getAddress);

export default router;
