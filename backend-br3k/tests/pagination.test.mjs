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

describe("Pagination", () => {

    it("should return the first page of books", async () => {
        await seedBooks();

        const response = await request(app)
            .get("/books?page=1");

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(5);
        expect(response.body.page).toBe(1);
        expect(response.body.pageSize).toBe(5);
    });

    it("should return the second page of books", async () => {
        const createdBooks = await seedBooks();

        const response = await request(app)
            .get("/books?page=2");

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(5);
        expect(response.body.page).toBe(2);
        expect(response.body.items[0].id).toBe(createdBooks[5].id);
    });

    it("should return remaining books on the last page", async () => {
        await seedBooks();

        const response = await request(app)
            .get("/books?page=5");

        expect(response.status).toBe(200);
        expect(response.body.items).toHaveLength(3);
    });

    it("should return an empty list if page is out of range", async () => {
        await seedBooks();

        const response = await request(app)
            .get("/books?page=99");

        expect(response.status).toBe(200);
        expect(response.body.items).toEqual([]);
    });
});