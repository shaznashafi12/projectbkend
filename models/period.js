import mongoose from "mongoose";

const cycleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lastPeriodStart: {
    type: Date,
    required: true,
  },
  cycleLength: {
    type: Number,
    required: true,
  },
  periodLength: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Cycle", cycleSchema);