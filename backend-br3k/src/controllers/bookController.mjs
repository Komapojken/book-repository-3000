import * as bookService from "../services/bookService.mjs";

export function createBook(req, res) {
    const book = bookService.createBook(req.body);

    res.status(201).json(book);
}

export function getAllBooks(req, res) {
    const books = bookService.getAllBooks(req.query);

    res.status(200).json(books);
}

export function getBookById(req, res) {
    const book = bookService.getBookById(req.params.id);

    if(!book.success && book.reason === "notFound") {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(book);
}

export function updateBookById(req, res) {
    const book = bookService.updateBookById(req.params.id, req.body);

    res.status(200).json(book);
}

export function deleteBookById(req, res) {
    bookService.deleteBookById(req.params.id);

    res.status(204).send();
}