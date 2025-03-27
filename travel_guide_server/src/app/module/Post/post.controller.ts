import { Model, Types } from 'mongoose';

export interface TPost {
  _id: Types.ObjectId;
  title: string;
  content: string;
  category: 'Web' | 'Software Engineering' | 'AI' | 'Gadgets' | 'Other';
  tags?: string[];
  author: Types.ObjectId;
  images?: string[];
  isPremium?: boolean;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  comments: Types.ObjectId[];
  createdAt?: Date;
}

export interface PostModel extends Model<TPost> {
  findByAuthor(authorId: string): Promise<TPost[]>;
}
