import mongoose from "mongoose";

const pregnancySchema = new mongoose.Schema(
  {
    lmp: { type: Date, required: true },
    week: { type: String, required: true },
    weekNumber: { type: Number, required: true, min: 0, max: 40 },
    trimester: {
      type: String,
      required: true,
      enum: ["First Trimester", "Second Trimester", "Third Trimester"],
    },
    dueMonth: { type: String, required: true },
    babySizeText: { type: String, default: "" },
  },
  { timestamps: true }
);

const Pregnancy = mongoose.model("Pregnancy", pregnancySchema);

export default Pregnancy;
