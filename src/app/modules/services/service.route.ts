import { Router } from "express";
import { ServiceController } from "./service.controller";

const router = Router();

router.post('/create-service', ServiceController.createService);

// get single Cow
router.get('/:id', ServiceController.getSingleService);

// update service
router.patch(
    '/:id',
    ServiceController.updateService
  );
  
  // get single service
  router.delete('/:id', ServiceController.deleteService);
  
  // get all service data
  router.get('/', ServiceController.getAllServices);

export const ServiceRoutes = router