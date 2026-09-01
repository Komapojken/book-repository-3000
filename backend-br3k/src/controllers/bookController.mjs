import * as bookService from "../services/bookService.mjs";

export function createBook(req, res) {
    const book = bookService.createBook(req.body);

    res.status(201).json(book);
}

export function getAllBooks(reg, res) {
    const books = bookService.getAllBooks();

    res.status(200).json(books);
}