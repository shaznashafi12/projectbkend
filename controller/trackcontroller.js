import Track from "../models/tracker.js";

export const createtrack = async (req, res) => {
  try {
    const { mood, impact, symptoms, journal } = req.body;

    const newEntry = await Track.create({
      mood,
      impact,
      symptoms,
      journal,
    });

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gettrack = async (req, res) => {
  try {
    const moods = await Track.find().sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
