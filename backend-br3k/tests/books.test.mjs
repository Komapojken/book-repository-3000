import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import crypto from "node:crypto";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/bookService.mjs";
import books from "../src/seed/books.mjs";

async function seedBooks() {
    for (const book of books) {
        await request(app)
            .post("/books")
            .send(book);
    }
}

// Configure a new inmemory database for each test

beforeEach(() => {
    initializeDatabase(createDatabase(":memory:"));
});

// Tests

describe("Books", () => {

    it("should create a book", async () => {

        const newBook = books[7];

        const response = await request(app)
            .post("/books")
            .send(newBook);

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.title).toBe(newBook.title);
        expect(response.body.author).toBe(newBook.author);
        expect(response.body.genre).toBe(newBook.genre);
        expect(response.body.publishedYear).toBe(newBook.publishedYear);
        expect(response.body.pages).toBe(newBook.pages);
    });

    it("should get all the books", async () => {

        await seedBooks();

        const response = await request(app)
        .get("/books");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(books.length);
        expect(response.body[0]).toEqual(
            expect.objectContaining({
                title: books[0].title,
                author: books[0].author
            })
        );
    });
});