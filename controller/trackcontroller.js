import Track from "../models/tracker.js";

export const createtrack = async (req, res) => {
  try {
    const { mood, impact, symptoms, journal, userId } = req.body;

    const newEntry = await Track.create({
      mood,
      impact,
      symptoms,
      journal,
      userId,
    });

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gettrack = async (req, res) => {
  try {
    const { userId } = req.query;

    const tracks = await Track.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tracks" });
  }
};