import { Model } from 'mongoose';



export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
};

export type UserModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  address: string;
  role?: 'seller' | 'buyer';
};
