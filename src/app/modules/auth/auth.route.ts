import { Router } from 'express'
import { UserController } from '../user/user.controller'
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';

const router = Router()

// create user
router.post(
    '/signup',
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  );

export const AuthRoutes = router
