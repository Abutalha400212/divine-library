"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post("/add-book", (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.addBook);
router.get("/", book_controller_1.BookController.getBooks);
router.patch("/comments/:id", book_controller_1.BookController.addComment);
router
    .route("/:id")
    .get(book_controller_1.BookController.getSingleBook)
    .patch((0, validateRequest_1.default)(book_validation_1.BookValidation.updateBookZodSchema), book_controller_1.BookController.updateBook)
    .delete(book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
