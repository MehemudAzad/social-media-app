import { model, Schema } from 'mongoose';
import { CommentModel, TComment } from './comment.interface';

const CommentSchema = new Schema(
  {
    postId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    upvotes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    downvotes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  { timestamps: true },
);

export const Comment = model<TComment, CommentModel>('Comment', CommentSchema);
