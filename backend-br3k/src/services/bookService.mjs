import crypto from "node:crypto";
import { mapBook } from "../mappers/bookMapper.mjs";

let db;

export function initializeDatabase(database) {
    db = database;
}

export function createBook(data) {
    const book = {
        "id" : crypto.randomUUID(),
        "title": data.title,
        "author": data.author,
        "genre": data.genre,
        "publishedYear": data.publishedYear,
        "pages": data.pages
    };

    db.prepare(`
        INSERT INTO books
        (id, title, author, genre, published_year, pages)
        VALUES (?, ?, ?, ?, ?, ?)    
    `).run(book.id, book.title, book.author, book.genre, book.publishedYear, book.pages);

    return book;
}

export function getAllBooks(query) {

    if (query.genre) {
        const books = db.prepare(`
            SELECT *
            FROM books
            WHERE genre LIKE ?
        `).all(`%${query.genre}%`);

        return books.map(mapBook);
    }

    if (query.author) {
        const books = db.prepare(`
            SELECT *
            FROM books
            WHERE author LIKE ?
        `).all(`%${query.author}%`);

        return books.map(mapBook);
    }

    const books = db.prepare(`
        SELECT * FROM books
    `).all();

    return books.map(mapBook);
}

export function getBookById(id) {
    const book = db.prepare(`
        SELECT *
        FROM books
        WHERE id = ?
    `).get(id);

    if(book === undefined) {
        return { success: false, reason: "notFound" };
    }

    return mapBook(book);
}

export function updateBookById(id, data) {
    db.prepare(`
        UPDATE books
        SET title = ?, author = ?, genre = ?, published_year = ?, pages = ?
        WHERE id = ?
    `).run(data.title, data.author, data.genre, data.publishedYear, data.pages, id);

    const book = db.prepare(`
        SELECT *
        FROM books
        WHERE id = ?
    `).get(id);

    return mapBook(book);
}

export function deleteBookById(id) {
    db.prepare(`
        DELETE FROM books
        WHERE id = ?
    `).run(id);
}