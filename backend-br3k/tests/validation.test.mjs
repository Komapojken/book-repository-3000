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
    initializeDatabase(createDatabase(":memory:"));
});

// Tests

describe("Books", () => {

    // POST /books

    it("should return 400 if the title is missing", async () => {

        const testBook = books[3];

        testBook.title = "";

        const response = await request(app)
            .post("/books")
            .send(testBook);

        expect(response.status).toBe(400);
    });

    it("should return 400 if the author is missing", async () => {

        const testBook = books[3];

        testBook.author = "";

        const response = await request(app)
            .post("/books")
            .send(testBook);

        expect(response.status).toBe(400);
    });

    it("should return 400 if the genre is missing", async () => {

        const testBook = books[3];

        testBook.genre = "";

        const response = await request(app)
            .post("/books")
            .send(testBook);

        expect(response.status).toBe(400);
    });

    it("should return 400 if the published year is missing", async () => {

        const testBook = books[3];

        testBook.publishedYear = null;

        const response = await request(app)
            .post("/books")
            .send(testBook);

        expect(response.status).toBe(400);
    });

    it("should return 400 if number of pages is missing", async () => {

        const testBook = books[3];

        testBook.pages = null;

        const response = await request(app)
            .post("/books")
            .send(testBook);

        expect(response.status).toBe(400);
    });
});