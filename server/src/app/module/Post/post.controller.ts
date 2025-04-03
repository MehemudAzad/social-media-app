import { PostService } from './post.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interface/image.interface';

const createPost = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(400, 'Please upload an image');
  }

  const item = await PostService.createPostIntoDB(
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post created successfully',
    data: item,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostService.getAllPosts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  });
});

const getPostById = catchAsync(async (req, res) => {
  const result = await PostService.getPostById(req.params.postId);

//   if (!result) {
//     sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'Post not found',
//     });
//   }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successfully',
    data: result,
  });
});

const deleteItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  await PostService.deletePostFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post deleted successfully',
    data: null,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  deleteItem
};
