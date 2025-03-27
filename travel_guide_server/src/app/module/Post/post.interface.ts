import { Types, Document, Model } from 'mongoose';

export interface TPost extends Document {
  title: string;
  content: string;
  category: 'Web' | 'Software Engineering' | 'AI' | 'Gadgets' | 'Other';
  tags: string[];
  author: Types.ObjectId; // Reference to User
  images: string[];
  isPremium: boolean;
  upvotes: Types.ObjectId[]; // Users who upvoted
  downvotes: Types.ObjectId[]; // Users who downvoted
  comments: Types.ObjectId[]; // References to Comment documents
  createdAt: Date;
}

// Static & Instance methods for Post Model
export interface PostModel extends Model<TPost> {
  upvotePost(postId: string, userId: string): Promise<TPost>;
  downvotePost(postId: string, userId: string): Promise<TPost>;
}
