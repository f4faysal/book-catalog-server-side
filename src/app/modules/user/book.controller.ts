import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constant/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';

import { bookFilterableFields } from './book.constant';
import { IBook } from './book.interface';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const result = await BookService.createBook(book);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully !',
    data: result,
  });
});
const createReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const reviews = req.body.reviews;
  const result = await BookService.createReview(bookId, reviews);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully !',
    data: result,
  });
});

const getallBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getallBook(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
const getSingelBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingelBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Book successfully !',
    data: result,
  });
});
const getaReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getaReview(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Book Review successfully !',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await BookService.updateBook(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Book successfully !',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Book successfully !',
    data: result,
  });
});
export const BookController = {
  createBook,
  getallBook,
  getSingelBook,
  updateBook,
  createReview,
  deleteBook,
  getaReview

};
