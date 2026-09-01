# Plan for Project Book Repository 3000

A course assignment in Node.js. The goal is to build a REST API with full CRUD functionality using Node.js, Express and SQLite.

## Theme

The chosen theme is books. I like books, and a book collection is simple enough to demonstrate all CRUD operations while still allowing filtering, pagination and validation.

## Goals

The project aims to:

- Build a REST API following common REST conventions.
- Implement all CRUD operations.
- Store data in a SQLite database using `better-sqlite3`.
- Write tests using Vitest.
- Document the API.
- Follow a Test-Driven Development (TDD) workflow as closely as possible.

## Planned Features

Each book will contain information such as:

- Title
- Author
- Genre
- Published year
- Number of pages

The API will support:

- Creating books
- Retrieving one or many books
- Updating book information
- Deleting books
- Filtering books by different properties
- Pagination using `page` and `limit` query parameters

## Technology

- Node.js
- Express
- SQLite
- better-sqlite3
- Vitest
- Swagger (planned)
- Git & GitHub