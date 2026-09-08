import request from "supertest";
import app from "../src/app.mjs";
import books from "../src/seed/books.mjs";

export async function seedBooks() {
    const createdBooks = [];

    for (const book of books) {
        const response = await request(app)
            .post("/books")
            .send(book);

        createdBooks.push(response.body);
    }

    return createdBooks;
}