import { Router } from 'express'
import { UserController } from '../user/user.controller'

const router = Router()

// Signup
router.post('/signup', UserController.createUser)

export const AuthRoutes = router
