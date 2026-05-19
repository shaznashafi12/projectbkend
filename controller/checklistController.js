import Checklist from "../models/checklist.js";


export const saveChecklist = async (req, res) => {
  try {

    const { userId, ...fields } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId required"
      });
    }

    const checklist = await Checklist.findOneAndUpdate(
      { userId },          // find by user
      { $set: fields },    // update fields sent from frontend
      {
        new: true,         // return updated document
        upsert: true       // create if not exists
      }
    );

    res.status(200).json({
      success: true,
      data: [checklist]   // keep array because your frontend expects it
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getChecklist = async (req, res) => {
  try {

    const { userId } = req.params;

    const checklist = await Checklist.findOne({ userId });

    res.status(200).json({
      success: true,
      data: checklist ? [checklist] : []
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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