import mongoose from "mongoose";

const waterSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  intake: {
    type: Number,
    default: 0
  }
},
{ timestamps: true }
);

const Water = mongoose.model("Water", waterSchema);

export default Water;