import { Model } from 'mongoose';

export type IBook = {
  user?: string;
  title: string;
  author: string;
  genre?: string;
  publicationDate: string;
  reviews: Array<string>;
};
export type UserModel = Model<IBook, Record<string, unknown>>;
export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
};
