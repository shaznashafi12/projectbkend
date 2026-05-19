import express from "express";
import { getTodayWater, updateWater } from "../controller/watercontroller.js";

const router = express.Router();

router.get("/:userId/:date", getTodayWater);

router.put("/:userId/:date", updateWater);

export default router;