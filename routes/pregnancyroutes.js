import express from "express";
import { createPregnancy, deletePregnancy, getAllPregnancies, getLatestPregnancy, updatePregnancy } from "../controller/pregnancycontroller.js";

const pregnancyroute = express.Router();

pregnancyroute.post("/create", createPregnancy);
pregnancyroute.get("/latest", getLatestPregnancy);
pregnancyroute.get("/all", getAllPregnancies);
pregnancyroute.put("/update/:id", updatePregnancy);
pregnancyroute.delete("/delete/:id", deletePregnancy);

export default pregnancyroute;
