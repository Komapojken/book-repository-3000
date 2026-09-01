import express from "express";
import * as bookController from "../controllers/bookController.mjs";

const router = express.Router();

// Post book
router.post("/", bookController.createBook);

// Get all books
router.get("/all", bookController.getAllBooks);

// Update book

// Delete book

export default router;