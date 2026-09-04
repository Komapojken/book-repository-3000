import express from "express";
import * as bookController from "../controllers/bookController.mjs";
import { validateCreateBook } from "../middleware/validationMiddleware.mjs";

const router = express.Router();

// Post book
router.post("/", validateCreateBook, bookController.createBook);

// Get all books
router.get("/", bookController.getAllBooks);

// Get book by id
router.get("/:id", bookController.getBookById);

// Update book
router.patch("/:id", validateCreateBook, bookController.updateBookById);

// Delete book
router.delete("/:id", bookController.deleteBookById);

export default router;