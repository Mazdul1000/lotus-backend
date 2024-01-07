import { Router } from 'express'
import { ServiceController } from './service.controller'
import validateRequest from '../../middlewares/validateRequest'
import { ServiceValidations } from './service.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = Router()

router.post(
  '/create-service',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ServiceValidations.createServiceZodSchema),
  ServiceController.createService,
)

// get single Cow
router.get('/:id', ServiceController.getSingleService)

// update service
router.patch(
  '/:id',
  validateRequest(ServiceValidations.updateServiceZodSchema),
  ServiceController.updateService,
)

// get single service
router.delete('/:id', ServiceController.deleteService)

// get all service data
router.get('/',auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN,), ServiceController.getAllServices)

export const ServiceRoutes = router
