import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

// Create a user
router.post(
  '/',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Get all users
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
