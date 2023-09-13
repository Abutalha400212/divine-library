import { IUser } from "../auth/auth.interface";

export type IBook = {
  title: string;
  author: string;
  image: string;
  genre: string;
  rating: number;
  publication: string;
  discription: string;
  wishlist: string;
  bookmark: string;
  email: string | IUser;
};

export type IBookFilter = {
  searchTerm?: string;
};
