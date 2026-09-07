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

    const existingBook = db.prepare(`
        SELECT *
        FROM books
        WHERE title = ?
        AND author = ?
    `).get(data.title, data.author);

    if (existingBook) {
        return { success: false, reason: "bookExists" };
    }

    db.prepare(`
        INSERT INTO books
        (id, title, author, genre, published_year, pages)
        VALUES (?, ?, ?, ?, ?, ?)    
    `).run(book.id, book.title, book.author, book.genre, book.publishedYear, book.pages);

    return book;
}

export function getAllBooks(query) {
    const page = query.page || 1;
    const pageSize = query.pageSize || 1000;
    const offset = (page - 1) * pageSize;

    if (query.genre && query.author) {
        const books = db.prepare(`
            SELECT *
            FROM books
            WHERE genre LIKE ?
            AND author LIKE ?
            LIMIT ?
            OFFSET ?
        `).all(`%${query.genre}%`, `%${query.author}%`, pageSize, offset);

        return { items: books.map(mapBook), page: query.page, pageSize: query.pageSize };
    }

    if (query.genre) {
        const books = db.prepare(`
            SELECT *
            FROM books
            WHERE genre LIKE ?
            LIMIT ?
            OFFSET ?
        `).all(`%${query.genre}%`, pageSize, offset);

        return { items: books.map(mapBook), page: query.page, pageSize: query.pageSize };
    }

    if (query.author) {
        const books = db.prepare(`
            SELECT *
            FROM books
            WHERE author LIKE ?
            LIMIT ?
            OFFSET ?
        `).all(`%${query.author}%`, pageSize, offset);

        return { items: books.map(mapBook), page: query.page, pageSize: query.pageSize };
    }

    if (query.pageSize && query.page) {
        const books = db.prepare(`
            SELECT *
            FROM books
            LIMIT ?
            OFFSET ?
        `).all(pageSize, offset);

        return { items: books.map(mapBook), page: query.page, pageSize: query.pageSize };
    }

    const books = db.prepare(`
        SELECT * FROM books
    `).all();

    return { items: books.map(mapBook), page: query.page, pageSize: query.pageSize };
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
    const existingBook = db.prepare(`
        SELECT *
        FROM books
        WHERE id = ?
    `).get(id);
    
    if (!existingBook) {
        return { success: false, reason: "notFound" };
    }

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
    const existingBook = db.prepare(`
        SELECT *
        FROM books
        WHERE id = ?
    `).get(id);
    
    if (!existingBook) {
        return { success: false, reason: "notFound" };
    }

    db.prepare(`
        DELETE FROM books
        WHERE id = ?
    `).run(id);

    return { success: true, message: "Book deleted" };
}