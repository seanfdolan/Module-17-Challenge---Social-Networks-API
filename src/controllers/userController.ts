
import { User, Thought } from "../models/index.js";

import { ObjectId } from 'mongodb';
// import { User} from '../models/index.js';
import { type Request, type Response } from 'express';


  // Get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

  // Get single user by id
  export const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({_id: userId});
        if (!user) {
          res.status(404).json({
                    message: 'User not found'
                  });
            } else {
              res.json(user);
            
            }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

  // Create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

  // Update a user
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  // Delete user (BONUS: and delete associated thoughts)
        // BONUS: Get ids of user's `thoughts` and delete them all
  export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        const thought = await Thought.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

  // Add friend to friend list
export const addFriend = async (req: any, res: any) => {
  console.log('You are adding a friend');
  console.log(req.body);
  try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body } },
          { runValidators: true, new: true }
      );

      if (!user) {
          return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
      }

      return res.json(user);
  } catch (err) {
      return res.status(500).json(err);
  }
}

  // Remove friend from friend list
export const removeFriend = async (req: any, res: any) => {
  try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friendId: req.params.friendId } } },
          { runValidators: true, new: true }
      );

      if (!user) {
          return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
      }

      return res.json(user);
  } catch (err) {
      return res.status(500).json(err);
  }
}
