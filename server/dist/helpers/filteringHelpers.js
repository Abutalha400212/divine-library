"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteringHelper = void 0;
const book_constant_1 = require("../app/modules/book/book.constant");
const BookFiltering = (options) => {
    const { searchTerm } = options;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.BookSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    return andConditions;
};
exports.FilteringHelper = {
    BookFiltering,
};
