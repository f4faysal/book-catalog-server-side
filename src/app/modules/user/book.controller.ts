import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constant/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './book.constant';
import { IBook } from './book.interface';
import { UserService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const result = await UserService.createUser(book);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  });
});
const getallBook = catchAsync(async (req: Request, res: Response) => {
  const filters: any = pick(req.query, userFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getallUser(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
const getSingelBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingelUser(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single User successfully !',
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await UserService.updateUser(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update User successfully !',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete User successfully !',
    data: result,
  });
});
export const BookController = {
  createBook,
  getallBook,
  getSingelBook,
  updateBook,
  deleteBook,
};
