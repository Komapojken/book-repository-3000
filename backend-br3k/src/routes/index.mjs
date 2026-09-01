import express from "express";
import ticketRoutes from "./ticketRoutes.mjs";

const router = express.Router();

// Tickets
router.use("/books", ticketRoutes);

export default router;