import { CommentService } from './Comment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

const createComment = catchAsync(async (req, res) => {
  const item = await CommentService.createCommentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment created successfully',
    data: item,
  });
});

const getAllComments = catchAsync(async (req, res) => {
  const result = await CommentService.getAllComments();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments retrieved successfully all',
    data: result,
  });
});

const getCommentByPostId = catchAsync(async (req, res) => {
  const result = await CommentService.getCommentById(req.params.PostId);
  console.log(req.params.PostId);
//   if (!result) {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'Comment not found',
//     });
//   }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment retrieved successfully by post id',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CommentService.deleteCommentFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment deleted successfully',
    data: null,
  });
});

export const CommentController = {
  createComment,
  getAllComments,
  getCommentByPostId,
  deleteComment
};
