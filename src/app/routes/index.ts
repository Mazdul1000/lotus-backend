import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { ServiceRoutes } from '../modules/services/service.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/sercie',
    route: ServiceRoutes
  }
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
