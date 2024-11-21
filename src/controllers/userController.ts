// import { Request, Response } from "express";
// import { User, Thought } from "../models";

// const userController = {
//   // Get all users
//   getUsers(_req: Request, res: Response) {
//     User.find()
//       .select("-__v")
//       .then((dbUserData) => {
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Get single user by id
//   getSingleUser(req: Request, res: Response) { //getUserById
//     User.findOne({ _id: req.params.userId })
//       .select("-__v")
//       .populate("friends")
//       .populate("thoughts")
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "No user with this id!" });
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Create a new user
//   createUser(req: Request, res: Response) {
//     User.create(req.body)
//       .then((dbUserData) => {
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Update a user
//   updateUser(req: Request, res: Response) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       {
//         $set: req.body,
//       },
//       {
//         runValidators: true,
//         new: true,
//       }
//     )
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "No user with this id!" });
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Delete user (BONUS: and delete associated thoughts)
//   // deleteUser(req: Request, res: Response) {
//   //   User.findOneAndDelete({ _id: req.params.userId })
//   //     .then((dbUserData) => {
//   //       if (!dbUserData) {
//   //         return res.status(404).json({ message: "No user with this id!" });
//   //       }

//   //       // BONUS: Get ids of user's `thoughts` and delete them all
//   //       return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } }); //deleteAllThoughts
//   //     })
//   //     .then(() => {
//   //       res.json({ message: "User and associated thoughts deleted!" });
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //       res.status(500).json(err);
//   //     });
//   // },

//   // Add friend to friend list
//   addFriend(req: Request, res: Response) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $addToSet: { friends: req.params.friendId } },
//       { new: true }
//     )
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "No user with this id!" });
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Remove friend from friend list
//   removeFriend(req: Request, res: Response) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $pull: { friends: req.params.friendId } },
//       { new: true }
//     )
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "No user with this id!" });
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },
// };

// export default userController;

import { Request, Response } from "express";
import { User, Thought } from "../models";

const userController = {
  // Get all users
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find().select("-__v");
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get single user by ID
  getSingleUser: async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).select("-__v").populate("friends").populate("thoughts");
      if (!user) {
        return res.status(404).json({ message: "No user with this ID!" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Create a new user
  createUser: async (req: Request, res: Response) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a user
  updateUser: async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this ID!" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete user and their associated thoughts
  deleteUser: async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "No user with this ID!" });
      }
      // Delete user's thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Add friend to user's friend list
  addFriend: async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this ID!" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Remove friend from user's friend list
  removeFriend: async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with this ID!" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

export default userController;

