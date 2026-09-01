import * as bookService from "../services/bookService.mjs";

export function createBook(req, res) {
    const book = bookService.createBook(req.body);

    res.status(201).json(book);
}