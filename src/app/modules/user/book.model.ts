import { Schema, model } from 'mongoose';
import { IBook, UserModel } from './book.interface';

const userSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      unique: true,
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// 3. Create a Model.
export const User = model<IBook, UserModel>('User', userSchema);
