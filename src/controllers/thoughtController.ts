import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';


  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error: any) {
      res.status(500).json({
        message: error.message
    });
    }
  };

  export const getSingleThought = async (req: Request, res: Response) => {  //getThoughtById
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findOne({ _id: thoughtId });  
      if (!thought) {
        res.json(thought);
      } else {
        res.status(404).json({
          message: 'No thought found with this id!'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
       
  // create a new thought
  export const createThought = async (req: Request, res: Response) => {
    const { thought } = req.body;
    try {
      const newThought = await Thought.create({
        thought
      });
      res.status(201).json(newThought);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!thought) {
        res.status(404).json({
          message: 'No thought with that ID'
        });
      } else {
        // await User.deleteMany({ _id: { $in: thought.users } });
        res.json({ message: 'Thought and users deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };


  // Add a video response
  export const addReaction = async (req: Request, res: Response) => {  //addReaction 
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughId },
        { $addToSet: { responses: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // Remove video response
  export const removeReaction = async (req: Request, res: Response) => {     //removeReaction
    try {
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.reactionId },
        { $pull: { reactions: { responseId: req.params.responseId } } }
      )

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }
