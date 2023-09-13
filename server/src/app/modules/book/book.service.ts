import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import { FilteringHelper } from "../../../helpers/filteringHelpers";
import {
  IGenereicResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import { IBook, IBookFilter } from "./book.interface";
import { Book } from "./book.model";

const addBook = async (payload: IBook): Promise<IBook> => {
  const addedCow = await Book.create(payload);
  return addedCow;
};
const addComment = async (
  id: string,
  payload: { comment: string }
): Promise<IBook | null> => {
  const { comment } = payload;
  const addComments = await Book.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        commnents: comment,
      },
    },
    {
      new: true,
    }
  );
  return addComments;
};
const getBooks = async (
  filters: IBookFilter,
  paginationOtions: IPaginationOptions
): Promise<IGenereicResponse<IBook[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.createPagination(paginationOtions);
  const sortCondition: { [key: string]: SortOrder } = {};
  const andConditions = FilteringHelper.BookFiltering(filters);
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Book.estimatedDocumentCount(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't found !");
  }
  const result = await Book.findById({ _id: id });
  return result;
};
const deleteBook = async (id: string): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't found !");
  }
  const result = await Book.findOneAndDelete({ _id: id });
  return result;
};
const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findById({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book doesn't found !");
  }
  const updatedBookData: Partial<IBook> = { ...payload };

  const result = await Book.findOneAndUpdate({ _id: id }, updatedBookData, {
    new: true,
  });
  return result;
};
export const BookService = {
  addBook,
  getBooks,
  getSingleBook,
  deleteBook,
  updateBook,
  addComment,
};
