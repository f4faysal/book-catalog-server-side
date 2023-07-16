import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

/**-----------------------------------------  
                createUser start
--------------------------------------------**/

const createBook = async (book: IBook): Promise<IBook> => {
  const result = await Book.create(book);
  return result;
};
const createReview = async (bookId: string, reviews: string): Promise<any> => {
  const result = await Book.updateOne(
    { _id: bookId },
    { $push: { reviews } }
  );
  return result;
};

/**-----------------------------------------  
                getallUser start
--------------------------------------------**/

const getallBook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    // .populate('academicSemester')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

/**-----------------------------------------  
                getSingelUser start
--------------------------------------------**/

const getSingelBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id });
  return result;
};
const getaReview = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id }, { reviews: 1, _id: 0 })
  return result;
};

/**-----------------------------------------  
                updateBook start
--------------------------------------------**/

const updateBook = async (id: string, payload: Partial<IBook>) => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Fount');
  }
  console.log(payload)
  const { ...BookData } = payload;

  const updateBookData: Partial<IBook> = { ...BookData };

  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach(key => {
  //     const nameKry = `name.${key}`;
  //     (updateBookData as any)[nameKry] = name[key as keyof typeof name];
  //   });
  // }

  const result = await Book.findOneAndUpdate({ _id: id }, updateBookData, {
    new: true,
  });

  return result;
};

/**-----------------------------------------  
                deleteBook start
--------------------------------------------**/

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete({ _id: id });
  return result;
};

export const BookService = {
  createBook,
  getallBook,
  getSingelBook,
  updateBook,
  deleteBook,
  createReview,
  getaReview
}
