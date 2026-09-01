import express from "express";
import * as bookController from "../controllers/bookController.mjs";

const router = express.Router();

// Post book
router.post("/", bookController.createBook);

// Get all books
router.get("/", bookController.getAllBooks);

// Get book by id
router.get("/:id", bookController.getBookById);

// Update book
router.patch("/:id", bookController.updateBookById);

// Delete book

export default router;