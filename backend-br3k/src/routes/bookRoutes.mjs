import express from "express";
import * as bookController from "../controllers/bookController.mjs";

const router = express.Router();

// Post book
router.post("/", bookController.createBook);

// Update book

// Delete book

// Get all books

export default router;