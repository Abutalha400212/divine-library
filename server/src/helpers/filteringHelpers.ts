import { BookSearchableFields } from "../app/modules/book/book.constant";
import { IBookFilter } from "../app/modules/book/book.interface";

const BookFiltering = (options: IBookFilter) => {
  const { searchTerm } = options;
  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: BookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  return andConditions;
};

export const FilteringHelper = {
  BookFiltering,
};
