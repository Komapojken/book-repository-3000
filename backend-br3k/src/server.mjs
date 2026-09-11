import "dotenv/config";
import app, { getPort } from "./app.mjs";
import { createDatabase } from "./database/databaseConfig.mjs";
import { initializeDatabase } from "./services/bookService.mjs";

// Setting port for server
let PORT;

try {
    PORT = getPort(process.env.PORT);
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

// Setting up database
try {
    const db = createDatabase("./database/books.db");
    initializeDatabase(db);
} catch (error) {
    console.error("Failed to open database", error);
    process.exit(1);
}

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});