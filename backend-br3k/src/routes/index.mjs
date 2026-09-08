import express from "express";
import bookRoutes from "./bookRoutes.mjs";

const router = express.Router();

// Books
router.use("/books", bookRoutes);

export default router;