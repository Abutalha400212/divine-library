import { Request, Response } from "express";
import httpStatus from "http-status";
import { filterFields } from "./book.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import { IBook } from "./book.interface";
import { paginationFields } from "../../../interfaces/common";

const addBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.addBook(bookData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Added successfully",
    data: result,
  });
});
const addComment = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body;
  const { id } = req.params;
  const result = await BookService.addComment(id, commentData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Thanks for your Feedback",
    data: result,
  });
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterFields);
  const paginationOtions = pick(req.query, paginationFields);
  const result = await BookService.getBooks(filters, paginationOtions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await BookService.getSingleBook(id);
  if (result) {
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book retrived successfully",
      data: result,
    });
  }
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Deleted successfully",
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.updateBook(id, req.body);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

export const BookController = {
  addBook,
  getBooks,
  getSingleBook,
  deleteBook,
  updateBook,
  addComment,
};
