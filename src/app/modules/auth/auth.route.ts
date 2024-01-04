import { Router } from 'express'
import { UserController } from '../user/user.controller'
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';
import { AuthController } from './authController';

const router = Router()

// create user
router.post(
    '/signup',
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  );

  // login user
  router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.loginUser);

export const AuthRoutes = router
