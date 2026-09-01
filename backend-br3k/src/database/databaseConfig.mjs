import Database from "better-sqlite3";

export function createDatabase(filename) {
    const db = new Database(filename);

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

    return db;
}