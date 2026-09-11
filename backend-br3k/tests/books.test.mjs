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

describe("Books", () => {

    // POST /books

    it("should create a book", async () => {

        const response = await request(app)
            .post("/books")
            .send({
                title: books[7].title,
                author: books[7].author,
                genre: books[7].genre,
                publishedYear: books[7].publishedYear,
                pages: books[7].pages
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.title).toBe(books[7].title);
        expect(response.body.author).toBe(books[7].author);
        expect(response.body.genre).toBe(books[7].genre);
        expect(response.body.publishedYear).toBe(books[7].publishedYear);
        expect(response.body.pages).toBe(books[7].pages);
    });

    it("should return 409 if the same title and author differ only by case", async () => {
        await seedBooks();

        const response = await request(app)
            .post("/books")
            .send({
                title: books[0].title.toLowerCase(),
                author: books[0].author.toLowerCase(),
                genre: books[0].genre,
                publishedYear: books[0].publishedYear,
                pages: books[0].pages
            });

        expect(response.status).toBe(409);
    });

    // GET /books

    it("should filter books by genre", async () => {

        await seedBooks();

        const response = await request(app)
            .get("/books?genre=Fantasy");

        expect(response.status).toBe(200);
        expect(response.body.items.length).toBeGreaterThan(0);

        for (const book of response.body.items) {
            expect(book.genre).toContain("Fantasy");
        }
    });

    it("should filter books by author", async () => {

        await seedBooks();

        const response = await request(app)
            .get("/books?author=Stephen King");

        expect(response.status).toBe(200);
        expect(response.body.items.length).toBeGreaterThan(0);

        for (const book of response.body.items) {
            expect(book.author).toContain("Stephen King");
        }
    });

    it("should filter books by genre and author", async () => {

        await seedBooks();

        const response = await request(app)
            .get("/books?genre=Horror&author=Stephen King");

        expect(response.status).toBe(200);
        expect(response.body.items.length).toBeGreaterThan(0);

        for (const book of response.body.items) {
            expect(book.genre).toContain("Horror");
            expect(book.author).toContain("Stephen King");
        }
    });

    it("should return 409 if the book already exists", async () => {

        await seedBooks();

        const response = await request(app)
            .post("/books")
            .send({
                title: books[0].title,
                author: books[0].author,
                genre: books[0].genre,
                publishedYear: books[0].publishedYear,
                pages: books[0].pages
            });

        expect(response.status).toBe(409);
    });

    // GET /books/:id

    it("should get book by id", async () => {

        const createdBooks = await seedBooks();

        const response = await request(app)
            .get(`/books/${createdBooks[2].id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(createdBooks[2].id);
    });

    it("should return 404 if a book is not found by id", async () => {
        await seedBooks();

        const response = await request(app)
            .get("/books/123");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Book not found" });
    });

    // PATCH /books/:id

    it("should update a book by id", async () => {

        const createdBooks = await seedBooks();

        const updatedBook = {
            title: createdBooks[4].title,
            author: createdBooks[4].author,
            genre: createdBooks[4].genre,
            publishedYear: createdBooks[4].publishedYear,
            pages: createdBooks[4].pages + 10
        };

        const response = await request(app)
            .patch(`/books/${createdBooks[4].id}`)
            .send(updatedBook);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(createdBooks[4].id);
        expect(response.body.title).toBe(createdBooks[4].title);
        expect(response.body.author).toBe(createdBooks[4].author);
        expect(response.body.genre).toBe(createdBooks[4].genre);
        expect(response.body.publishedYear).toBe(createdBooks[4].publishedYear);
        expect(response.body.pages).toBe(createdBooks[4].pages + 10);
    });

    it("should return 404 if id not found", async () => {

        await seedBooks();

        const response = await request(app)
            .patch("/books/123")
            .send({
                title: "The art of farting",
                author: "Greg the flatulent",
                genre: "Comedy",
                publishedYear: 1976,
                pages: 1337
            });

        expect(response.status).toBe(404);
    });

    it("should return 409 if updated book would duplicate another book", async () => {
        const createdBooks = await seedBooks();

        const response = await request(app)
            .patch(`/books/${createdBooks[4].id}`)
            .send({
                title: createdBooks[0].title,
                author: createdBooks[0].author,
                genre: createdBooks[4].genre,
                publishedYear: createdBooks[4].publishedYear,
                pages: createdBooks[4].pages
            });

        expect(response.status).toBe(409);
        expect(response.body).toEqual({ message: "Book already exists in database" });
    });

    // DELETE /books/:id

    it("should delete a book by id", async () => {

        const createdBooks = await seedBooks();

        const response = await request(app)
            .delete(`/books/${createdBooks[4].id}`);

        expect(response.status).toBe(204);

        const getResponse = await request(app)
            .get(`/books/${createdBooks[4].id}`);

        expect(getResponse.status).toBe(404);
    });

    it("should return 404 if a book is not found by id when deleting", async () => {

        await seedBooks();

        const response = await request(app)
            .delete("/books/123");

        expect(response.status).toBe(404);
    });
});