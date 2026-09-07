# Project Book Repository 3000

## About

Book Repository 3000 is a REST API backend developed as a school examination project. It is built with Node.js, Express.js, and SQLite using a layered architecture.

## Tech Stack

- Node.js
- Express.js
- Better SQLite3
- Vitest
- Supertest

## Features

- CRUD operations for books
- Filtering by genre
- Filtering by author
- Pagination (5 books per page)
- Input validation
- Unit and integration tests

## Requirements

- node 22+

## Installation

```bash
git clone <repository>
cd book-repository-3000/backend-br3k
npm install
cp .env.example .env
npm run init-db
npm run dev
```

## Usage

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /books | Create a book |
| GET | /books | Get all books |
| GET | /books/:id | Get a book by ID |
| PATCH | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |

## Running Tests

To run tests.

```bash
cd backend-br3k
npm test -- --run
```

## Documentation

## Project Structure

```text
book-repository-3000/
├── backend-br3k/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── bookController.mjs
│   │   ├── database/
│   │   │   ├── databaseConfig.mjs
│   │   │   └── initDatabase.mjs
│   │   ├── mappers/
│   │   │   └── bookMapper.mjs
│   │   ├── middleware/
│   │   │   └── validationMiddleware.mjs
│   │   ├── routes/
│   │   │   ├── bookRoutes.mjs
│   │   │   └── index.mjs
│   │   ├── seed/
│   │   │   └── books.mjs
│   │   ├── services/
│   │   │   └── bookService.mjs
│   │   ├── app.mjs
│   │   └── server.mjs
│   │
│   ├── tests/
│   │   ├── books.test.mjs
│   │   ├── pagination.test.mjs
│   │   ├── validation.test.mjs
│   │   └── setup.mjs
│   │
│   ├── database/
│   │   └── books.db
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── vitest.config.mjs
│
├── docs/
│   ├── dev-log.md
│   ├── inl2-api.md
│   ├── inl2.pdf
│   ├── plan.md
│   └── todo.md
│
├── .gitignore
└── README.md
```

## Final notes

> "Knowledge is the path the ignorant seldom treads."
>
> —CorseBot