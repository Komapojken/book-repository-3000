import Database from "better-sqlite3";

export function createDatabase(filename) {
    const db = new Database(filename);

    db.prepare(`
    CREATE TABLE IF NOT EXISTS books
    (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL COLLATE NOCASE,
        author TEXT NOT NULL COLLATE NOCASE,
        genre TEXT NOT NULL,
        published_year INTEGER,
        pages INTEGER,
        UNIQUE (title, author)
    )
    `).run();

    try {
        db.prepare(`
            CREATE UNIQUE INDEX IF NOT EXISTS idx_books_title_author
            ON books (title COLLATE NOCASE, author COLLATE NOCASE)
        `).run();
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            throw new Error(
                "Database has duplicate title and author rows. Run npm run init-db to reset."
            );
        }
        throw error;
    }

    return db;
}