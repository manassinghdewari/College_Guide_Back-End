import express from "express";
import {
  createUniversity,
  getAllUniversity,
  updateUniversity,
  deleteUniversity,
  getUniversity,
  getUniversityColleges,
} from "../controllers/university.js";

import { verifyUniversity } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyUniversity, createUniversity);

//UPDATE
router.put("/:id", verifyUniversity, updateUniversity);

//DELETE
router.delete("/:id", verifyUniversity, deleteUniversity);

//GET
router.get("/:id", getUniversity);

router.get("/", getAllUniversity);

router.get("/:id", getUniversityColleges);
export default router;
