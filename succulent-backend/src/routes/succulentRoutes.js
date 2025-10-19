import express from "express";
import Succulent from "../models/Succulent.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🪴 Get all succulents for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const succulents = await Succulent.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ succulents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching succulents" });
  }
});

// 🌱 Create a new succulent
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const newSuc = new Succulent({ name, owner: req.user.id });
    await newSuc.save();
    res.status(201).json(newSuc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating succulent" });
  }
});

// 💧 Update succulent (e.g. water it)
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { lastWatered } = req.body;

  try {
    const updated = await Succulent.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      { lastWatered },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Succulent not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating succulent" });
  }
});

// 🗑 Delete succulent
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Succulent.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!deleted)
      return res.status(404).json({ message: "Succulent not found" });
    res.json({ message: "Succulent deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting succulent" });
  }
});

export default router;
