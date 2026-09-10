import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/bookService.mjs";
import books from "../src/seed/books.mjs";

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

        const response = await request(app)
            .post("/books")
            .send({
                title: books[7].title,
                author: books[7].author,
                genre: books[7].genre,
                publishedYear: books[7].publishedYear,
                pages: books[7].pages
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    });

    // GET /books

    it("should return 500 when getting books and the database is unavailable", async () => {

        const response = await request(app)
            .get("/books?page=1");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    });

    // JSON

    it("should return 400 if the request body is invalid JSON", async () => {
        const response = await request(app)
            .post("/books")
            .set("Content-Type", "application/json")
            .send("{ invalid json");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Invalid JSON" });
    });
});