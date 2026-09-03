import "dotenv/config";
import app from "./app.mjs";
import { createDatabase } from "./database/databaseConfig.mjs";
import { initializeDatabase } from "./services/bookService.mjs";

// Setting up database
const db = createDatabase("./database/books.db");
initializeDatabase(db);

// Setting port for server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});