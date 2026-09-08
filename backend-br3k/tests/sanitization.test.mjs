import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.mjs";
import { createDatabase } from "../src/database/databaseConfig.mjs";
import { initializeDatabase } from "../src/services/bookService.mjs";

// Configure a new inmemory database for each test

beforeEach(() => {
    initializeDatabase(createDatabase(":memory:"));
});

// Tests

describe("Sanitization", () => {

    // POST /books

    it("should trim whitespace from title", async () => {
        const response = await request(app)
            .post("/books")
            .send({
                title: "   The Hobbit   ",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                publishedYear: 1937,
                pages: 310
            });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe("The Hobbit");
    });

    it("should trim whitespace from author", async () => {
        const response = await request(app)
            .post("/books")
            .send({
                title: "The Hobbit",
                author: "   J.R.R. Tolkien   ",
                genre: "Fantasy",
                publishedYear: 1937,
                pages: 310
            });

        expect(response.status).toBe(201);
        expect(response.body.author).toBe("J.R.R. Tolkien");
    });

    it("should trim whitespace from genre", async () => {
        const response = await request(app)
            .post("/books")
            .send({
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "   Fantasy   ",
                publishedYear: 1937,
                pages: 310
            });

        expect(response.status).toBe(201);
        expect(response.body.genre).toBe("Fantasy");
    });

    it("should treat titles with surrounding whitespace as duplicates", async () => {
        await request(app)
            .post("/books")
            .send({
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                publishedYear: 1937,
                pages: 310
            });

        const response = await request(app)
            .post("/books")
            .send({
                title: "   The Hobbit   ",
                author: "   J.R.R. Tolkien   ",
                genre: "Fantasy",
                publishedYear: 1937,
                pages: 310
            });

        expect(response.status).toBe(409);
    });

    it("should strip HTML tags from title", async () => {
        const response = await request(app)
            .post("/books")
            .send({
                title: "<script>The Hobbit</script>",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                publishedYear: 1937,
                pages: 310
            });
        expect(response.status).toBe(201);
        expect(response.body.title).toBe("The Hobbit");
    });

    it("should strip HTML tags from author", async () => {
        const response = await request(app)
            .post("/books")
            .send({
                title: "The Hobbit",
                author: "<b>J.R.R. Tolkien</b>",
                genre: "Fantasy",
                publishedYear: 1937,
                pages: 310
            });
        expect(response.status).toBe(201);
        expect(response.body.author).toBe("J.R.R. Tolkien");
    });

    it("should strip HTML tags from genre", async () => {
        const response = await request(app)
            .post("/books")
            .send({
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "<div>Fantasy</div>",
                publishedYear: 1937,
                pages: 310
            });
        expect(response.status).toBe(201);
        expect(response.body.genre).toBe("Fantasy");
    });
});