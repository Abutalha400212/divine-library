"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const filteringHelpers_1 = require("../../../helpers/filteringHelpers");
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const book_model_1 = require("./book.model");
const addBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const addedCow = yield book_model_1.Book.create(payload);
    return addedCow;
});
const addComment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment } = payload;
    const addComments = yield book_model_1.Book.findOneAndUpdate({ _id: id }, {
        $push: {
            commnents: comment,
        },
    }, {
        new: true,
    });
    return addComments;
});
const getBooks = (filters, paginationOtions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.PaginationHelper.createPagination(paginationOtions);
    const sortCondition = {};
    const andConditions = filteringHelpers_1.FilteringHelper.BookFiltering(filters);
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.Book.estimatedDocumentCount(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Book doesn't found !");
    }
    const result = yield book_model_1.Book.findById({ _id: id });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Book doesn't found !");
    }
    const result = yield book_model_1.Book.findOneAndDelete({ _id: id });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findById({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Book doesn't found !");
    }
    const updatedBookData = Object.assign({}, payload);
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, updatedBookData, {
        new: true,
    });
    return result;
});
exports.BookService = {
    addBook,
    getBooks,
    getSingleBook,
    deleteBook,
    updateBook,
    addComment,
};
