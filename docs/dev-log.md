# dev log of project Book Repository 3000

Documentation of development.

## dev log

---

Date: 2026-09-08
Time: 20:41

Task: Code refactoring and cleanup. Updated README. Test passed.

---

Date: 2026-09-08
Time: 18:53

Task: Updated Swagger with 500 responses on all endpoints. Updated README.md.

---

Date: 2026-09-08
Time: 18:40

Task: Implemented script input sanitization. Test passed.

Next: Update Swagger with 500 responses.

---

Date: 2026-09-08
Time: 17:53

Task: Added test for script input sanitization. Test failed.

Next: Implement script input sanitization.

---

Date: 2026-09-08
Time: 16:51

Task: Implemented error handling server/database error. Test passed.

Next: Enhance input sanitization (remove script).

---

Date: 2026-09-08
Time: 16:22

Task: Added test for error handling server/database error. Test failed.

Notes: Adding error handling because I forgot to do it earlier.

Next: Implement error handling for server/database error.

---

Date: 2026-09-08
Time: 15:21

Task: 'npm run init-db' now creates database-folder if missing on a fresh install. Added fix for better-sqlite3 v13 bug on windows Updated README.md.

---

Date: 2026-09-08
Time: 14:55

Task: Updated README.md.

---

Date: 2026-09-08
Time: 14:32

Task: Bug-hunt successful. GET /books is now always paginated. Removed one obsolete test from 'books.test.mjs'.

Notes: Simplified the GET /books logic. Pagination is now handled consistently for all requests, fixing edge cases introduced during the initial implementation.

Next: Update README.md.

---

Date: 2026-09-08
Time: 11:39

Task: Implemented swagger documentation of endpoints.

Next: Bug-hunt in pagination.

---

Date: 2026-09-08
Time: 10:22

Task: Implemented input sanitization. Test passed.

Next: Swagger implementation.

---

Date: 2026-09-08
Time: 10:09

Task: Added test for input sanitization. Test failed.

Next: Implement input sanitization.

---

Date: 2026-09-07
Time: 16:00

Task: Updated README.md. Added .env.example with evironment variables.

Notes: Some sections of README still empty. More work to be done.

Next: Input sanitization.

---

Date: 2026-09-07
Time: 15:06

Task: Implemented pagination for GET /books. Refactor of books.test.mjs since pagination broke som tests. Test passed.

Next: README

---

Date: 2026-09-07
Time: 13:58

Task: Added test for pagination for GET /books. Test failed.

Next: Implement pagination for GET /books.

---

Date: 2026-09-04
Time: 12:55

Task: Refactor of DELETE /books/:id. Now check if book exist before deleting. Added test. Test passed.

Notes: Forgot to add test and then implement.

Next: Pagination.

---

Date: 2026-09-04
Time: 11:16

Task: Implemented validation and id check for PATCH /books/:id. Test passed.

Next: Refactor of DELETE /books/:id with id check.

---

Date: 2026-09-04
Time: 11:07

Task: Added test for validation and id check for PATCH /books/:id. Test failed.

Next: Implement validation and id check for PATCH /books/:id.

---

Date: 2026-09-04
Time: 10:17

Task: Implemented validation and duplication protection for POST /books. Test passed.

Next: Add test for validation for PATCH /books/:id.

---

Date: 2026-09-04
Time: 09:15

Task: Added test for validation and duplication protection for POST /books. Test failed.

Notes: Add protection against creating multiple copies of the same book in the database.

Next: Implement validation for POST /books.

---

Date: 2026-09-03
Time: 21:08

Task: Implemented GET /books?genre=<Keyword>&author=<Keyword>. Test passed.

Next: Test and implementation of validation.

---

Date: 2026-09-03
Time: 20:53

Task: Added test for GET /books?genre=<Keyword>&author=<Keyword>. Test failed.

Next: Implement GET /books?genre=<Keyword>&author=<Keyword>.

---

Date: 2026-09-03
Time: 20:24

Task: Implemented GET /books?author=<Keyword>. Test passed.

Notes: This is a school project. Implementing only two filters.

Next: Add test for GET /books?genre=<Keyword>&author=<Keyword>.

---

Date: 2026-09-03
Time: 20:19

Task: Added test for GET /books?author=<Keyword>. Test failed.

Next: Implement GET /books?author=<Keyword>.

---

Date: 2026-09-03
Time: 19:58

Task: Implemented GET /books?genre=<Keyword>. Test passed.

Next: Add test for GET /books?author=<Keyword>.

---

Date: 2026-09-03
Time: 19:48

Task: Added test for GET /books?genre=<Keyword>. Test failed.

Next: Implement filter by genre.

---

Date: 2026-09-03
Time: 19:34

Task: Added init-db script to create and seed SQLite database.

Notes: Seeding database for demo is now simple as 'npm run init-db".

Next: Implement filtering by genre/author.

---

Date: 2026-09-03
Time: 16:17

Task: Implement DELETE /books/:id. Refactor of GET /books/:id to handle 'Not found'. Test passed.

Notes: Minimal changes to GET /books/:id to pass the test. More will come as the project progesses.

Next: Implement script to initialize database.

---

Date: 2026-09-03
Time: 14:59

Task: Added test for DELETE /books/:id.

---

Date: 2026-09-03
Time: 10:38

Task: Added pdf-file of the assignment to docs-folder.

---

Date: 2026-09-01
Time: 20:43

Task: Added mapper for SQL book to API book. Implemented in bookService.

---

Date: 2026-09-01
Time: 20:30

Task: Implemented PATCH /books/:id. Test passed.

---

Date: 2026-09-01
Time: 19:52

Task: Removed '/all' from 'GET /books/all'. Edit of dev-log entries.

---

Date: 2026-09-01
Time: 16:24

Task: Added test for PATCH /books/:id. Test failed.

---

Date: 2026-09-01
Time: 15:56

Task: Implemented GET /books/:id. Test passed. Refactor of test and seed-data in tests.

---

Date: 2026-09-01
Time: 15:26

Task: Added test for GET /books/:id. Test failed.

---

Date: 2026-09-01
Time: 15:13

Task: Implemented GET /books. Test passed.

---

Date: 2026-09-01
Time: 14:57

Task: Added test for GET /books. Test failed. Added seed-data. Refactor tests to use seed-data.

---

Date: 2026-09-01
Time: 14:05

Task: Implemented POST /books. Test passed.

---

Date: 2026-09-01
Time: 13:35

Task: Added test for POST /books. Test failed.

---

Date: 2026-09-01
Time: 13:15

Task: Reinstallation of packages in correct place. Added minimal code to start implementing tests.

---

Date: 2026-09-01
Time: 08:18

Task: Initializing git. Creating and adding remote repo.

---

Date: 2026-09-01
Time: 08:15

Task: Added all packages required for the project.

---

Date: 2026-08-31
Time: Unknown

Task: Start of project. Initializing documentation.

---