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
    const PAGE_SIZE = 5;
    const offset = (page - 1) * PAGE_SIZE;

    if (query.genre && query.author) {
        const books = db.prepare(`
            SELECT *
            FROM books
            WHERE genre LIKE ?
            AND author LIKE ?
            LIMIT ?
            OFFSET ?
        `).all(`%${query.genre}%`, `%${query.author}%`, PAGE_SIZE, offset);

        return { items: books.map(mapBook), page: page, pageSize: PAGE_SIZE };
    }

    if (query.genre) {
        const books = db.prepare(`
            SELECT *
            FROM books
            WHERE genre LIKE ?
            LIMIT ?
            OFFSET ?
        `).all(`%${query.genre}%`, PAGE_SIZE, offset);

        return { items: books.map(mapBook), page: page, pageSize: PAGE_SIZE };
    }

    if (query.author) {
        const books = db.prepare(`
            SELECT *
            FROM books
            WHERE author LIKE ?
            LIMIT ?
            OFFSET ?
        `).all(`%${query.author}%`, PAGE_SIZE, offset);

        return { items: books.map(mapBook), page: page, pageSize: PAGE_SIZE };
    }

    const books = db.prepare(`
        SELECT *
        FROM books
        LIMIT ?
        OFFSET ?
    `).all(PAGE_SIZE, offset);

    return { items: books.map(mapBook), page: page, pageSize: PAGE_SIZE };
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

    return { success: true };
}