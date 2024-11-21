// import Thought from "../../models/Thought.js";
// import { Request, Response } from "express";

// const router = require("express").Router();
// // Create a reaction
// router.post("/:thoughtId/reactions", async (req: Request, res: Response) => {
//   try {
//     const thought = await Thought.findById(req.params.thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: "Thought not found" });
//     }
//     thought.reactions.push(req.body);
//     await thought.save();
//     res.status(201).json(thought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Delete a reaction
// router.delete("/:thoughtId/reactions/:reactionId", async (req: Request, res: Response) => {
//   try {
//     const thought = await Thought.findById(req.params.thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: "Thought not found" });
//     }
//     thought.reactions.pull({ _id: req.params.reactionId });
//     await thought.save();
//     res.json({ message: "Reaction removed" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

import { Router } from "express";
import Thought from "../../models/Thought.js";

const router = Router(); // Use ES6 Router import

// Create a reaction
router.post("/:thoughtId/reactions", async (req, res) => {
  const { thoughtId } = req.params; // Destructure for cleaner access
  const reaction = req.body;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    thought.reactions.push(reaction);
    await thought.save();

    res.status(201).json(thought);
  } catch (err) {
    console.error(err); // Log errors for debugging
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

// Delete a reaction
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    // Use `.pull` to remove the reaction by ID
    thought.reactions.pull({ _id: reactionId });
    await thought.save();

    res.json({ message: `Reaction with ID ${reactionId} removed` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

export default router; // Use ES6 default export
