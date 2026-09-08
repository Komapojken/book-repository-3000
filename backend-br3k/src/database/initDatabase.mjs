import Database from "better-sqlite3";
import crypto from "node:crypto";
import books from "../../src/seed/books.mjs";
import fs from "node:fs";

function importDataToDb() {

    fs.mkdirSync("./database", { recursive: true });

    const db = new Database("./database/books.db");
    
    db.prepare(`
        DROP TABLE IF EXISTS books
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS books
        (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT NOT NULL,
            published_year INTEGER,
            pages INTEGER
        )
    `).run();

    for (const book of books) {
        const id = crypto.randomUUID();

        db.prepare(`
            INSERT INTO books
            (id, title, author, genre, published_year, pages)
            VALUES (?, ?, ?, ?, ?, ?)    
        `).run(id, book.title, book.author, book.genre, book.publishedYear, book.pages);
    }

    db.close();
}

importDataToDb();