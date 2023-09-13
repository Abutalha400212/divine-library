export interface IBook {
  _id: number;
  title: string;
  author: string;
  image: string;
  genre: string;
  rating: number;
  publication: string;
  discription: string;
  wishlist: string;
  bookmark: string;
  email: string;
}

export type IResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export type IAuthUserResponse = {
  accessToken: string;
};
