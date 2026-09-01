import crypto from "node:crypto";

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