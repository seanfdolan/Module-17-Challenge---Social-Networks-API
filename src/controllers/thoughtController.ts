// import { Thought, User } from '../models/index.js';
// import { Request, Response } from 'express';


//   export const getThoughts = async (_req: Request, res: Response) => {
//     try {
//       const videos = await Thought.find();
//       res.json(Thought);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

//   export const getSingleThought = async (req: Request, res: Response) => {  //getThoughtById
//     try {
//       const thought = await Thought.findOne({ _id: req.params.videoId })
  
//       if (!thought) {
//         return res.status(404).json({ message: 'No thought with that ID' });
//       }
  
//       res.json(thought);
//       return; 
//     } catch (err) {
//       res.status(500).json(err);
//     }
  
//     return;
//   }

//   // create a new video
//   export const createThought = async (req: Request, res: Response) => {
//     try {
//       const thought = await Thought.create(req.body);
//       const user = await User.findOneAndUpdate(
//         { _id: req.body.userId },
//         { $addToSet: { thoughts: thought._id } },
//         { new: true }
//       );
  
//       if (!user) {
//         return res.status(404).json({
//           message: 'Thought created, but found no user with that ID',
//         });
//       }
  
//       res.json('Created the thought 🎉');
//       return;
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
  
//     return;
//   }

//   export const updateThought = async (req: Request, res: Response) => {
//     try {
//       const thought = await Thought.findOneAndUpdate(
//         { _id: req.params.thoughtId },
//         { $set: req.body },
//         { runValidators: true, new: true }
//       );
  
//       if (!thought) {
//         return res.status(404).json({ message: 'No thought with this id!' });
//       }
  
//       res.json(thought);
//       return;
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//       return; 
//     }
//   }

//   export const deleteThought = async (req: Request, res: Response) => {
//     try {
//       const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
//       if (!thought) {
//         return res.status(404).json({ message: 'No thought with this id!' });
//       }
  
//       const user = await User.findOneAndUpdate(
//         { thoughts: req.params.thoughtId },
//         { $pull: { videos: req.params.thoughtId } },
//         { new: true }
//       );
  
//       if (!user) {
//         return res
//           .status(404)
//           .json({ message: 'Thought created but no user with this id!' });
//       }
  
//       res.json({ message: 'Thought successfully deleted!' });
//     } catch (err) {
//       res.status(500).json(err);
//     }
  
//     return; 
//   }

//   // Add a video response
//   export const addThoughtResponse = async (req: Request, res: Response) => {  //addReaction 
//     try {
//       const thought = await Thought.findOneAndUpdate(
//         { _id: req.params.thoughtId },
//         { $addToSet: { responses: req.body } },
//         { runValidators: true, new: true }
//       );

//       if (!thought) {
//         return res.status(404).json({ message: 'No thought with this id!' });
//       }

//       res.json(thought);
//       return;
//     } catch (err) {
//       res.status(500).json(err);
//       return;
//     }
//   }

//   // Remove video response
//   export const removeThoughtResponse = async (req: Request, res: Response) => {     //removeReaction
//     try {
//       const thought = await Thought.findOneAndUpdate(
//         { _id: req.params.videoId },
//         { $pull: { reactions: { responseId: req.params.responseId } } },
//         { runValidators: true, new: true }
//       )

//       if (!thought) {
//         return res.status(404).json({ message: 'No thought with this id!' });
//       }

//       res.json(thought);
//       return;
//     } catch (err) {
//       res.status(500).json(err);
//       return;
//     }
//   }


import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

// Get all thoughts
export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought by ID
export const getSingleThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Thought created, but no user with that ID found',
      });
    }

    res.json({ message: 'Thought created 🎉' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought
export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndDelete(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID!' });
    }

    const user = await User.findOneAndUpdate(
      { thoughts: thoughtId },
      { $pull: { thoughts: thoughtId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Thought deleted, but no user with this ID found',
      });
    }

    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a reaction to a thought
export const addThoughtResponse = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $addToSet: { responses: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a reaction from a thought
export const removeThoughtResponse = async (req: Request, res: Response) => {
  const { thoughtId, responseId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { responses: { responseId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
