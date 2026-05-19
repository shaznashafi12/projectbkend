import Water from "../models/water.js";

export const getTodayWater = async (req, res) => {
  try {

    const { userId, date } = req.params;

    let record = await Water.findOne({ userId, date });

    if (!record) {
      record = await Water.create({
        userId,
        date,
        intake: 0
      });
    }

    res.json(record);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateWater = async (req, res) => {
  try {

    const { userId, date } = req.params;
    const { intake } = req.body;

    const updated = await Water.findOneAndUpdate(
      { userId, date },
      { intake },
      { new: true, upsert: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};