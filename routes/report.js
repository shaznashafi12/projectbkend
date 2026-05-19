import express from "express";
import upload from "../config/multer.js";
import { getAllReports, uploadReport } from "../controller/uploadcontroller.js";
import { authMiddleware } from "../middleware/auth.js";

const reportrouter = express.Router();

reportrouter.post("/upload", authMiddleware, upload.single("file"), uploadReport);
reportrouter.get("/all", authMiddleware, getAllReports);

export default reportrouter;