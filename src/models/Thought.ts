import mongoose from 'mongoose';
import { Schema, Types, model, type Document } from 'mongoose';
// import dateFormat from '../utils/dateFormat';

interface IReaction extends Document {
  reactionId: mongoose.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

// Reaction Schema (Subdocument)
const reactionSchema = new Schema<IReaction>({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt: any) => createdAt.toISOString(),
  },
});

// Thought Schema
const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt: any) => createdAt.toISOString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const Thought = model('Thought', thoughtSchema);
const Reaction = model("Reaction", reactionSchema);

export default Thought;

