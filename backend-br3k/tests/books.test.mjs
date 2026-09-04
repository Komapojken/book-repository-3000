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

    // GET /books

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

    it("should filter books by genre", async () => {

        await seedBooks();

        const response = await request(app)
            .get("/books?genre=Fantasy");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

        for (const book of response.body) {
            expect(book.genre).toContain("Fantasy");
        }
    });

    it("should filter books by author", async () => {

        await seedBooks();

        const response = await request(app)
            .get("/books?author=Stephen King");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

        for (const book of response.body) {
            expect(book.author).toContain("Stephen King");
        }
    });

    it("should filter books by genre and author", async () => {

        await seedBooks();

        const response = await request(app)
            .get("/books?genre=Horror&author=Stephen King");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

        for (const book of response.body) {
            expect(book.genre).toContain("Horror");
            expect(book.author).toContain("Stephen King");
        }
    });

    it("should return 409 if the book already exists", async () => {

        await seedBooks();
        const book = books[0];

        const response = await request(app)
            .post("/books")
            .send(book);

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

    // PATCH /books/:id

    it("should get update a book by id", async () => {

        const createdBooks = await seedBooks();

        const originalBook = createdBooks[4];

        const updatedBook = {
            "title": originalBook.title,
            "author": originalBook.author,
            "genre": originalBook.genre,
            "publishedYear": originalBook.publishedYear,
            "pages": originalBook.pages + 10
        };

        const response = await request(app)
            .patch(`/books/${originalBook.id}`)
            .send(updatedBook);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(originalBook.id);
        expect(response.body.title).toBe(originalBook.title);
        expect(response.body.author).toBe(originalBook.author);
        expect(response.body.genre).toBe(originalBook.genre);
        expect(response.body.publishedYear).toBe(originalBook.publishedYear);
        expect(response.body.pages).toBe(originalBook.pages + 10);
    });

    it("should get return 404 if id not found", async () => {

        await seedBooks();

        const testBook = {
            id: "123",
            title: books[2].title,
            author: books[2].author,
            genre: books[2].genre,
            publishedYear: books[2].publishedYear,
            pages: books[2].pages + 10
        };

        const response = await request(app)
            .patch(`/books/${testBook.id}`)
            .send(testBook);

        expect(response.status).toBe(404);
    });

    // DELETE /books/:id

    it("should delete a book by id", async () => {

        const createdBooks = await seedBooks();

        const id = createdBooks[4].id;

        const response = await request(app)
            .delete(`/books/${id}`);

        expect(response.status).toBe(204);

        const getResponse = await request(app)
            .get(`/books/${id}`);

        expect(getResponse.status).toBe(404);
    });
});