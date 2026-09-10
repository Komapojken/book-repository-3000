import "dotenv/config";
import app, { getPort } from "./app.mjs";
import { createDatabase } from "./database/databaseConfig.mjs";
import { initializeDatabase } from "./services/bookService.mjs";

// Setting up database
try {
    const db = createDatabase("./database/books.db");
    initializeDatabase(db);
} catch (error) {
    console.error("Failed to open database", error);
    process.exit(1);
}

// Setting port for server
const PORT = getPort(process.env.PORT);

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});