import Report from "../models/upload.js";

export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const { name, userId } = req.body; // get userId from frontend

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const newReport = await Report.create({
      name,
      fileUrl: req.file.path,
      date: new Date().toLocaleDateString(),
      type: "Medical Report",
      status: "Normal",
      user: userId   // save reference
    });

    res.status(201).json({
      success: true,
      message: "Report uploaded successfully",
      data: newReport
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// 📥 Get All Reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "name email usertype")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reports
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};