import { Router } from "express";
import { ServiceController } from "./service.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";

const router = Router();

router.post('/create-service',
validateRequest(ServiceValidations.createServiceZodSchema),
ServiceController.createService);

// get single Cow
router.get('/:id', ServiceController.getSingleService);

// update service
router.patch(
    '/:id',
    validateRequest(ServiceValidations.updateServiceZodSchema),
    ServiceController.updateService
  );
  
  // get single service
  router.delete('/:id', ServiceController.deleteService);
  
  // get all service data
  router.get('/', ServiceController.getAllServices);

export const ServiceRoutes = router