import { Model, Types } from 'mongoose';

export interface TComment {
  postId: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  upvotes?: Types.ObjectId[];
  downvotes?: Types.ObjectId[];
  parentComment?: Types.ObjectId | null;
}

export interface CommentModel extends Model<TComment> {
  findCommentsByPost(postId: string): Promise<TComment[]>;
}
