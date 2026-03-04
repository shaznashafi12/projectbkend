import Checklist from "../models/checklist.js";


// Save or Update Checklist
export const saveChecklist = async (req, res) => {
  try {
    const {
      userId,
      motherItems,
      babyItems,
      newbornCare,
      documents,
      supportPerson,
      cSectionIncluded
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    let checklist = await Checklist.findOne({ userId });

    if (checklist) {
      checklist.motherItems = motherItems;
      checklist.babyItems = babyItems;
      checklist.newbornCare = newbornCare;
      checklist.documents = documents;
      checklist.supportPerson = supportPerson;
      checklist.cSectionIncluded = cSectionIncluded;

      await checklist.save();
    } else {
      checklist = await Checklist.create({
        userId,
        motherItems,
        babyItems,
        newbornCare,
        documents,
        supportPerson,
        cSectionIncluded
      });
    }

    res.status(200).json({
      success: true,
      data: checklist
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Get checklist for single user
export const getChecklist = async (req, res) => {
  try {
    const { userId } = req.params;

    const checklists = await Checklist.find({ userId });

    res.status(200).json({
      success: true,
      data: checklists
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get ALL checklists for admin
export const getAllChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: checklists
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};