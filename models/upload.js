import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    date: String,
    type: String,
    status: {
      type: String,
      default: "Normal"
    },user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  
  { timestamps: true }
);

const Report = mongoose.model("Report",reportSchema);

export default Report;
