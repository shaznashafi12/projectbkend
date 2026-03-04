import mongoose from "mongoose";

const trackerschema = new mongoose.Schema(
  {
    mood: {
      type: String,
      required: true,
    },
    impact: {
      type: String,
      required: true,
    },
    symptoms: {
      type: [String],   // ← array
      default: [],
    },
    journal: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }  // ← important for createdAt
);

const Track = mongoose.model("Track", trackerschema);
export default Track;
