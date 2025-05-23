import { Types, Model } from 'mongoose';

export type TPost = {
  title: string;
  content?: string;
  tags?: string[];
  author?: Types.ObjectId; // Reference to User
  images: string[];
  isPremium: boolean;
  upvotes?: Types.ObjectId[]; // Users who upvoted
  downvotes?: Types.ObjectId[]; // Users who downvoted
  createdAt?: Date;
}

// Static & Instance methods for Post Model
export interface PostModel extends Model<TPost> {
  upvotePost(postId: string, userId: string): Promise<TPost>;
  downvotePost(postId: string, userId: string): Promise<TPost>;
}
