import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/bookService.mjs";
import books from "../src/seed/books.mjs";
import { seedBooks } from "./helpers.mjs";

// Configure a new inmemory database for each test

beforeEach(() => {
    initializeDatabase(createDatabase(":memory:"));
});

// Tests

describe("Validation", () => {

    // POST /books

    it("should return 400 if the title is missing", async () => {

        const response = await request(app)
            .post("/books")
            .send({
                title: "",
                author: books[3].author,
                genre: books[3].genre,
                publishedYear: books[3].publishedYear,
                pages: books[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if the author is missing", async () => {

        const response = await request(app)
            .post("/books")
            .send({
                title: books[3].title,
                author: "",
                genre: books[3].genre,
                publishedYear: books[3].publishedYear,
                pages: books[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if the genre is missing", async () => {

        const response = await request(app)
            .post("/books")
            .send({
                title: books[3].title,
                author: books[3].author,
                genre: "",
                publishedYear: books[3].publishedYear,
                pages: books[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if the published year is missing", async () => {

        const response = await request(app)
            .post("/books")
            .send({
                title: books[3].title,
                author: books[3].author,
                genre: books[3].genre,
                publishedYear: null,
                pages: books[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if number of pages is missing", async () => {

        const response = await request(app)
            .post("/books")
            .send({
                title: books[3].title,
                author: books[3].author,
                genre: books[3].genre,
                publishedYear: books[3].publishedYear,
                pages: null
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if the published year is less than 1", async () => {
        const response = await request(app)
            .post("/books")
            .send({
                title: books[3].title,
                author: books[3].author,
                genre: books[3].genre,
                publishedYear: -50,
                pages: books[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if number of pages is less than 1", async () => {
        const response = await request(app)
            .post("/books")
            .send({
                title: books[3].title,
                author: books[3].author,
                genre: books[3].genre,
                publishedYear: books[3].publishedYear,
                pages: 0
            });

        expect(response.status).toBe(400);
    });

    it("should accept a published year in the far future", async () => {
        const response = await request(app)
            .post("/books")
            .send(books[2]);

        expect(response.status).toBe(201);
        expect(response.body.publishedYear).toBe(3402);
    });

    // PATCH /books/:id

    it("should return 400 if the title is missing", async () => {

        const createdBooks = await seedBooks();

        const response = await request(app)
            .patch(`/books/${createdBooks[3].id}`)
            .send({
                title: "",
                author: createdBooks[3].author,
                genre: createdBooks[3].genre,
                publishedYear: createdBooks[3].publishedYear,
                pages: createdBooks[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if the author is missing", async () => {

        const createdBooks = await seedBooks();

        const response = await request(app)
            .patch(`/books/${createdBooks[3].id}`)
            .send({
                title: createdBooks[3].title,
                author: "",
                genre: createdBooks[3].genre,
                publishedYear: createdBooks[3].publishedYear,
                pages: createdBooks[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if the genre is missing", async () => {

        const createdBooks = await seedBooks();

        const response = await request(app)
            .patch(`/books/${createdBooks[3].id}`)
            .send({
                title: createdBooks[3].title,
                author: createdBooks[3].author,
                genre: "",
                publishedYear: createdBooks[3].publishedYear,
                pages: createdBooks[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if the published year is missing", async () => {

        const createdBooks = await seedBooks();

        const response = await request(app)
            .patch(`/books/${createdBooks[3].id}`)
            .send({
                title: createdBooks[3].title,
                author: createdBooks[3].author,
                genre: createdBooks[3].genre,
                publishedYear: null,
                pages: createdBooks[3].pages
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 if number of pages is missing", async () => {

        const createdBooks = await seedBooks();

        const response = await request(app)
            .patch(`/books/${createdBooks[3].id}`)
            .send({
                title: createdBooks[3].title,
                author: createdBooks[3].author,
                genre: createdBooks[3].genre,
                publishedYear: createdBooks[3].publishedYear,
                pages: null
            });

        expect(response.status).toBe(400);
    });
});