import Cycle from "../models/period.js";

/* ===============================
   Save or Update Cycle Data
================================= */
export const saveCycle = async (req, res) => {
  try {
    const { userId, lastPeriodStart, cycleLength, periodLength } = req.body;

if (!userId || !lastPeriodStart) {
  return res.status(400).json({ message: "Required fields missing" });
}
    let cycle = await Cycle.findOne({ user: userId });

    if (cycle) {
      // Update existing
      cycle.lastPeriodStart = lastPeriodStart;
      cycle.cycleLength = cycleLength;
      cycle.periodLength = periodLength;

      await cycle.save();
    } else {
      // Create new
      cycle = await Cycle.create({
        user: userId,
        lastPeriodStart,
        cycleLength,
        periodLength,
      });
    }

    res.status(200).json({
      success: true,
      cycle,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Get Cycle Data
================================= */
export const getCycle = async (req, res) => {
  try {
    const { userId } = req.params;

    const cycle = await Cycle.findOne({ user: userId });

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle data not found",
      });
    }

    res.status(200).json({
      success: true,
      cycle,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};