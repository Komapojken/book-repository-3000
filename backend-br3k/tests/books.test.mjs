import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import crypto from "node:crypto";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/bookService.mjs";

// Configure a new inmemory database for each test

beforeEach(() => {
    initializeDatabase(createDatabase(":memory:"));
});

// Tests

describe("Books", () => {

    it("should create a book", async () => {

        const newBook = {
            "title": "The angry dragon.",
            "author": "Robban the greatest",
            "genre": "Sci-fi, Horror, Comedy",
            "published_year": 2026,
            "pages": 1976
        };

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
});