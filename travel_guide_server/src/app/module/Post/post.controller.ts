import { PostService } from './post.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createPost = catchAsync(async (req, res) => {
  const result = await PostService.createPost(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Post created successfully',
    data: result,
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

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
};
