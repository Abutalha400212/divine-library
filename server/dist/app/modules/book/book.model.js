"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
