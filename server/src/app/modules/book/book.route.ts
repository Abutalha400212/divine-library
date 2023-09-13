import express from "express";
import { BookController } from "./book.controller";
import validateRequest from "../../../middleware/validateRequest";
import { BookValidation } from "./book.validation";
const router = express.Router();
router.post(
  "/add-book",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.addBook
);
router.get("/", BookController.getBooks);
router.patch("/comments/:id", BookController.addComment);
router
  .route("/:id")
  .get(BookController.getSingleBook)
  .patch(
    validateRequest(BookValidation.updateBookZodSchema),
    BookController.updateBook
  )
  .delete(BookController.deleteBook);

export const BookRoutes = router;
