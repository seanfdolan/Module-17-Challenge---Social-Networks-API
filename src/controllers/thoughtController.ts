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
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the thought 🎉');
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
    }

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
      if (!thought) {
        return res.status(404).json({
          message: 'Application created but no thought with this id!',
        });
      }
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({
            message: 'Application created but no user with this id!',
          });
        }
    res.json({ message: "Thought deleted."})
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };


  // Add a video response
  export const addReaction = async (req: any, res: any) => {  //addReaction 
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughId },
        { $addToSet: { reactions: req.body } },
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
  export const removeReaction = async (req: any, res: any) => {     //removeReaction
    try {
      const thought = await Thought.findOneAndDelete(
        { _id: req.params.reactionId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
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
