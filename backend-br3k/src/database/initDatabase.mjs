import books from "../seed/books.mjs";
import fs from "node:fs";
import { createDatabase } from "./databaseConfig.mjs";
import { initializeDatabase, createBook } from "../services/bookService.mjs";

const DB_PATH = "./database/books.db";

function importDataToDb() {

    fs.mkdirSync("./database", { recursive: true });
    fs.rmSync(DB_PATH, { force: true });

    const db = createDatabase(DB_PATH);
    initializeDatabase(db);

    for (const book of books) {
        createBook(book);
    }

    db.close();
}

importDataToDb();