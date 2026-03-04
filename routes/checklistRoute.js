import express from "express";
import {
  saveChecklist,
  getChecklist,
  getAllChecklists
} from "../controller/checklistController.js";

const checklistRouter = express.Router();

checklistRouter.post("/save", saveChecklist);
checklistRouter.get("/user/:userId", getChecklist);
checklistRouter.get("/all", getAllChecklists); // 🔥 Admin route

export default checklistRouter;