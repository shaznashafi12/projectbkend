import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
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
    }
  },
  
  { timestamps: true }
);

const Report = mongoose.model("Report",reportSchema);

export default Report;
