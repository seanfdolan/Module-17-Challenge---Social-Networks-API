// // import express from 'express';
// // const router = express.Router();
// import User from '../../models/User.js';
// import Thought from '../../models/Thought.js';
// import express, { Router } from 'express';
// import { Request, Response } from 'express';

// const router: Router = express.Router();


// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get a single user by ID with populated thoughts and friends
// router.get('/:userId', async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Create a new user
// router.post('/', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Update a user by ID
// router.put('/:userId', async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Delete a user by ID (bonus: remove associated thoughts)
// router.delete('/:userId', async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Delete associated thoughts
//     res.json({ message: 'User and their thoughts have been deleted' });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
