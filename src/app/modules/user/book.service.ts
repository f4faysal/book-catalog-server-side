import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './book.constant';
import { IUser, IUserFilters } from './book.interface';
import { User } from './book.model';

/**-----------------------------------------  
                createUser start
--------------------------------------------**/

const createUser = async (user: IUser): Promise<IUser> => {
  // default password
  if (user.role === 'seller') {
    (user.income = 0), (user.budget = 0);
  }
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const result = await User.create(user);
  if (!createUser) {
    throw new Error('Failed to create user!');
  }
  return result;
};

/**-----------------------------------------  
                getallUser start
--------------------------------------------**/

const getallUser = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
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

  const result = await User.find(whereConditions)
    // .populate('academicSemester')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

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

const getSingelUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

/**-----------------------------------------  
                updateUser start
--------------------------------------------**/

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Fount');
  }

  const { name, ...UserData } = payload;

  const updateUserData: Partial<IUser> = { ...UserData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKry = `name.${key}`;
      (updateUserData as any)[nameKry] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updateUserData, {
    new: true,
  });

  return result;
};

/**-----------------------------------------  
                deleteUser start
--------------------------------------------**/

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

export const UserService = {
  createUser,
  getallUser,
  getSingelUser,
  updateUser,
  deleteUser,
};
