import Report from "../models/upload.js";

// Upload Report
export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const { name, userId } = req.body;

    const newReport = await Report.create({
      name,
      fileUrl: req.file.path,
      date: new Date().toLocaleDateString(),
      type: "Medical Report",
      status: "Normal",
      userId: userId   // ✅ save userId correctly
    });

    res.status(201).json({
      success: true,
      message: "Report uploaded successfully",
      data: newReport
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Upload failed"
    });
  }
};


// Get reports for logged-in user
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({
      userId: req.user._id
    });

    res.json({
      success: true,
      data: reports
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reports"
    });
  }
};