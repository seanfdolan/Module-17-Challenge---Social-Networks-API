// import express from "express";
// const router: Router = express.Router();
// import Thought from "../../models/Thought";
// import User from "../../models/User";
// import { Router, Request, Response } from 'express';
// // const router: Router = Router();

// // Get all thoughts
// router.get("/", async (req, res) => {
//   try {
//     const thoughts = await Thought.find();
//     res.json(thoughts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get a single thought by ID
// router.get("/:thoughtId", async (req: Request, res: Response) => {
//   try {
//     const thought = await Thought.findById(req.params.thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: "Thought not found" });
//     }
//     res.json(thought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Create a new thought and push it to the user's thoughts
// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const thought = new Thought(req.body);
//     await thought.save();
//     const user = await User.findById(req.body.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     user.thoughts.push(thought._id);
//     await user.save();
//     res.status(201).json(thought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Update a thought
// router.put("/:thoughtId", async (req: Request, res: Response) => {
//   try {
//     const thought = await Thought.findByIdAndUpdate(
//       req.params.thoughtId,
//       req.body,
//       { new: true }
//     );
//     if (!thought) {
//       return res.status(404).json({ message: "Thought not found" });
//     }
//     res.json(thought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Delete a thought
// router.delete("/:thoughtId", async (req: Request, res: Response) => {
//   try {
//     const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: "Thought not found" });
//     }
//     res.json({ message: "Thought deleted" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// export default router; // Instead of module.exports = router;
