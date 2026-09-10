# Project Book Repository 3000

## About

Book Repository 3000 is a RESTful API for managing books, developed as a school examination project. It is built with Node.js, Express.js, and SQLite using a layered architecture.

## Tech Stack

- Node.js
- Express.js
- Better SQLite3
- Vitest
- Supertest

## Features

- CRUD operations for books
- Input sanitization
- Request validation
- Filtering by genre
- Filtering by author
- Pagination (5 books per page)
- Unit and integration tests
- Interactive Swagger documentation

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

Start the development server.

```bash
npm run dev
```

The API is available at:

```
http://localhost:3001
```

Interactive API documentation is available at:

```
http://localhost:3001/api-docs
```

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
cd book-repository-3000/backend-br3k
npm test -- --run
```

## Documentation

The API is documented using Swagger (OpenAPI).

After starting the server, visit:

```
http://localhost:3001/api-docs
```

to explore all endpoints, request bodies, query parameters, and response formats.

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
│   │   │   ├── errorMiddleware.mjs
│   │   │   └── validationMiddleware.mjs
│   │   ├── routes/
│   │   │   ├── bookRoutes.mjs
│   │   │   └── index.mjs
│   │   ├── seed/
│   │   │   └── books.mjs
│   │   ├── services/
│   │   │   └── bookService.mjs
│   │   ├── swagger/
│   │   │   └── swaggerConfig.mjs
│   │   ├── app.mjs
│   │   └── server.mjs
│   │
│   ├── tests/
│   │   ├── books.test.mjs
│   │   ├── cors.test.mjs
│   │   ├── errorHandling.test.mjs
│   │   ├── helpers.mjs
│   │   ├── pagination.test.mjs
│   │   ├── sanitization.test.mjs
│   │   ├── setup.mjs
│   │   └── validation.test.mjs
│   │
│   ├── database/
│   │   └── books.db
│   │
│   ├── .env.example
│   ├── .npmrc
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
> —CourseBot