import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/bookService.mjs";
import books from "../src/seed/books.mjs";

async function seedBooks() {
    const createdBooks = [];

    for (const book of books) {
        const response = await request(app)
            .post("/books")
            .send(book);

        createdBooks.push(response.body);
    }

    return createdBooks;
}

// Configure a new inmemory database for each test

beforeEach(() => {
    const db = createDatabase(":memory:");
    db.close();
    initializeDatabase(db);
});

// Tests

describe("Error handling", () => {

    // POST /books

    it("should return 500 when posting a book and the database is unavailable", async () => {        

        const newBook = books[7];

        const response = await request(app)
            .post("/books")
            .send(newBook);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    });

    // GET /books

    it("should return 500 when getting books books by genre and the database is unavailable", async () => {

        await seedBooks();

        const response = await request(app)
            .get("/books?page=1");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    });
});