import {
  addDocumentToIndex,
  deleteDocumentFromIndex,
} from '../../utils/meilisearch';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const createCommentIntoDB = async (payload: TComment) => {
  const result = await Comment.create(payload);

  //   await addDocumentToIndex(result, 'Comments');
  return result;
};

const getAllComments = async () => {
  const result = await Comment.find({}).populate('author', 'username email');

  return result;
};

const getCommentById = async (postId: string) => {
  console.log("from service", postId);
  const result = await Comment.find({postId})
    .populate('author', '_id username') // Populate author details
  return result;
};

const deleteCommentFromDB = async (CommentId: string) => {
  const result = await Comment.findByIdAndDelete(CommentId);
  //   const deletedItemId = result?._id;
  //   if (deletedItemId) {
  //     await deleteDocumentFromIndex('Comments', deletedItemId.toString());
  //   }
  return result;
};

export const CommentService = {
  createCommentIntoDB,
  getAllComments,
  getCommentById,
  deleteCommentFromDB,
};
