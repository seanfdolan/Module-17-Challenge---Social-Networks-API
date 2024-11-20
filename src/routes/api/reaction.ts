import Thought from "../../models/Thought.js";
import { Request, Response } from "express";

const router = require("express").Router();
// Create a reaction
router.post("/:thoughtId/reactions", async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a reaction
router.delete("/:thoughtId/reactions/:reactionId", async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    thought.reactions.pull({ _id: req.params.reactionId });
    await thought.save();
    res.json({ message: "Reaction removed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
