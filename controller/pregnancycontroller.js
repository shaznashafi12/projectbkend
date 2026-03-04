import Pregnancy from "../models/pregnancy.js";

export const createPregnancy = async (req, res) => {
  try {
    const newPregnancy = await Pregnancy.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pregnancy data saved successfully",
      data: newPregnancy,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to save pregnancy data",
      error: error.message,
    });
  }
};

export const getLatestPregnancy = async (req, res) => {
  try {
    const latest = await Pregnancy.findOne({ user: req.userId })
      .sort({ createdAt: -1 }); 
         if (!latest) {
      return res.status(404).json({
        success: false,
        message: "No pregnancy records found",
      });
    }

    res.status(200).json({
      success: true,
      data: latest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pregnancy data",
      error: error.message,
    });
  }
};

export const getAllPregnancies = async (req, res) => {
  try {
    const data = await Pregnancy.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch records",
      error: error.message,
    });
  }
};

export const updatePregnancy = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Pregnancy.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Pregnancy record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update record",
      error: error.message,
    });
  }
};

export const deletePregnancy = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Pregnancy.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Pregnancy record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete record",
      error: error.message,
    });
  }
};
