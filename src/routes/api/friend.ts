// import User from '../../models/User';
// import { Request, Response } from 'express';

// const router = require('express').Router();
// // Add a new friend
// router.post('/:userId/friends/:friendId', async (req: Request, res: Response) => {
//     try {
//       const user = await User.findById(req.params.userId);
//       const friend = await User.findById(req.params.friendId);
//       if (!user || !friend) {
//         return res.status(404).json({ message: 'User or friend not found' });
//       }
//       user.friends.push(friend._id);
//       friend.friends.push(user._id); // Add reverse reference
//       await user.save();
//       await friend.save();
//       res.json({ message: 'Friend added' });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   // Remove a friend
//   router.delete('/:userId/friends/:friendId', async (req: Request, res: Response) => {
//     try {
//       const user = await User.findById(req.params.userId);
//       const friend = await User.findById(req.params.friendId);
//       if (!user || !friend) {
//         return res.status(404).json({ message: 'User or friend not found' });
//       }
//       user.friends = user.friends.filter((id: any) => !id.equals(friend._id));
//       friend.friends = friend.friends.filter((id: any) => !id.equals(user._id)); // Remove reverse reference
//       // user.friends.pull(friend._id);
//       // friend.friends.pull(user._id);

//       await user.save();
//       await friend.save();
//       res.json({ message: 'Friend removed' });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   export default router;
  
import { Router } from 'express';
import User from '../../models/User';

const router = Router();

// Add a new friend
router.post('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Add mutual friendship
    if (!user.friends.includes(friend._id)) user.friends.push(friend._id);
    if (!friend.friends.includes(user._id)) friend.friends.push(user._id);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});

// Remove a friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Remove mutual friendship
    user.friends = user.friends.filter((id) => !id.equals(friend._id));
    friend.friends = friend.friends.filter((id) => !id.equals(user._id));

    await user.save();
    await friend.save();

    res.json({ message: 'Friend removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});

export default router;
