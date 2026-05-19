import mongoose from "mongoose";

const trackerschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    impact: {
      type: String,
      required: true,
    },
    symptoms: {
      type: [String],
      default: [],
    },
    journal: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Track = mongoose.model("Track", trackerschema);

export default Track;