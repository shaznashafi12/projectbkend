import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  motherItems: {
    type: [String],
    default: []
  },

  babyItems: {
    type: [String],
    default: []
  },

  newbornCare: {
    type: [String],
    default: []
  },

  documents: {
    type: [String],
    default: []
  },

  supportPerson: {
    type: [String],
    default: []
  },

  cSectionIncluded: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Checklist = mongoose.model("Checklist", checklistSchema);
export default Checklist; 