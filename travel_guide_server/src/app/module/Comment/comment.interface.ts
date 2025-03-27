import { Model, Types } from 'mongoose';

export interface TComment {
  _id: Types.ObjectId;
  postId: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  upvotes?: Types.ObjectId[];
  downvotes?: Types.ObjectId[];
  parentComment?: Types.ObjectId | null;
  createdAt?: Date;
}

export interface CommentModel extends Model<TComment> {
  findCommentsByPost(postId: string): Promise<TComment[]>;
}
