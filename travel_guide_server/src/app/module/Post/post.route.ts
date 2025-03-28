import express from 'express';
import { PostController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
// import { PostValidation } from './post.validation';

const router = express.Router();

// Create a new post
router.post(
  '/',
//   validateRequest(PostValidation.createPostValidationSchema),
  PostController.createPost
);

// Get all posts
router.get('/', PostController.getAllPosts);

// Get a single post by ID
router.get('/:postId', PostController.getPostById);

export const PostRoutes = router;
