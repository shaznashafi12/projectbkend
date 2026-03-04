import express from "express";
import upload from "../config/multer.js";
import { getAllReports, uploadReport } from "../controller/uploadcontroller.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadReport);
router.get("/all", getAllReports);

export default router;
