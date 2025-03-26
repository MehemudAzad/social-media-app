import { CarServices } from './car.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createCar = catchAsync(async (req, res) => {
  //will call service function
  const result = await CarServices.carServiceIntoDB(req.body);
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car created successfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars fetched successfully!',
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car fetched successfully!',
    data: result,
  });
});

const updateSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.updateSingleCarFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully!',
    data: result,
  });
});

const deleteSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteSingleCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car deleted successfully!',
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const result = await CarServices.returnCarIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car returned successfully',
    data: result,
  });
});

export const CarController = {
  createCar,
  getAllCars,
  getSingleCar,
  deleteSingleCar,
  updateSingleCar,
  returnCar,
};
