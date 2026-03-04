import express from "express";
import { getCycle, saveCycle } from "../controller/periodscontroller.js";

const periodsrouter = express.Router();

periodsrouter.post("/save", saveCycle);
periodsrouter.get("/:userId", getCycle);

export default periodsrouter;