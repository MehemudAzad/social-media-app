import express from 'express';
import { PostController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { parseBody } from '../../middlewares/bodyParser';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
// import { PostValidation } from './post.validation';

const router = express.Router();

// // Create a new post
// router.post(
//   '/',
// //   validateRequest(PostValidation.createPostValidationSchema),
//   PostController.createPost
// );

// Get all posts
router.get('/', PostController.getAllPosts);

// Get a single post by ID
router.get('/:postId', PostController.getPostById);


router.post(
  '/create',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'itemImages' }]),
  // validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  // validateRequest(ItemValidation.createItemValidationSchema),
  PostController.createPost
);

export const PostRoutes = router;
