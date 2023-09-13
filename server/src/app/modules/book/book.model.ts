import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    genre: { type: String, required: true },
    rating: { type: Number },
    publication: { type: String, required: true },
    discription: { type: String, required: true },
    wishlist: String,
    bookmark: String,
    email: {
      type: String,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export const Book = model<IBook>("Book", bookSchema);
