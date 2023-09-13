"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createBookZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: "Title is required",
        }),
        author: zod_1.default.string({
            required_error: "Author is required",
        }),
        genre: zod_1.default.string({
            required_error: "Genre is required",
        }),
        publication: zod_1.default.string({
            required_error: "Publication is required",
        }),
        rating: zod_1.default.number().optional(),
        wishlist: zod_1.default.string().optional(),
        bookmark: zod_1.default.string().optional(),
        discription: zod_1.default.string({
            required_error: "Discription is required",
        }),
    }),
});
const updateBookZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        author: zod_1.default.string().optional(),
        genre: zod_1.default.string().optional(),
        wishlist: zod_1.default.string().optional(),
        bookmark: zod_1.default.string().optional(),
        publication: zod_1.default.string().optional(),
        rating: zod_1.default.number().optional(),
        discription: zod_1.default.string().optional(),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
};
