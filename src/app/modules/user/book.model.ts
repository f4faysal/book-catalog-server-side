import { Schema, model } from 'mongoose';
import { IBook, UserModel } from './book.interface';

const userSchema = new Schema<IBook>(
  {
    user: { type: String },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publicationDate: { type: String, required: true },
    reviews: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// 3. Create a Model.
export const Book = model<IBook, UserModel>('Book', userSchema);
