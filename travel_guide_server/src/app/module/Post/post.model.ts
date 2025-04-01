import { model, Schema } from 'mongoose';
import { PostModel, TPost } from './post.interface';

const PostSchema = new Schema({
    title: { type: String, required: false },
    content: { type: String, required: false },
    category: { type: String, enum: ['Web', 'Software Engineering', 'AI', 'Gadgets', 'Other'], required: false },
    tags: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    images: [{ type: String }],
    isPremium: { type: Boolean, default: false },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now }
});

export const Post = model<TPost, PostModel>('Post', PostSchema);

// export const User = model<TUser, UserModel>('User', userSchema);
// export const User = model<TUser, UserModel>('User', userSchema);