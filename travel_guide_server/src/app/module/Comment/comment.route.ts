import express from 'express';
import { CommentController } from './Comment.controller';
import { parseBody } from '../../middlewares/bodyParser';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

// Get all Comments
router.get('/', CommentController.getAllComments);

// Get a single Comment by ID
router.get('/:PostId', CommentController.getCommentByPostId);


router.post(
  '/',
  auth(USER_ROLE.USER),
  // validateImageFileRequest(ImageFilesArrayZodSchema),
  // validateRequest(ItemValidation.createItemValidationSchema),
  CommentController.createComment
);

router.delete('/:id', auth(USER_ROLE.USER), CommentController.deleteComment);

export const CommentRoutes = router;
