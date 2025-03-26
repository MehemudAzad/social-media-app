import express from 'express';
import { CarController } from './car.controller';
import { CarValidations } from './car.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

//insert a car
router.post(
  '/',
  auth('admin'),
  validateRequest(CarValidations.createCarValidationSchema),
  CarController.createCar,
);

//retrieve all orders
router.get('/', CarController.getAllCars);

//get single car from id
router.get('/:id', CarController.getSingleCar);

//update car using id
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CarValidations.updateCarValidationSchema),
  CarController.updateSingleCar,
);

//delete car using id
router.delete('/:id', auth('admin'), CarController.deleteSingleCar);

router.put('/return', auth('admin'), CarController.returnCar);

export const CarRoutes = router;
