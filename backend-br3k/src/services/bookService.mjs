import crypto from "node:crypto";

let db;

export function initializeDatabase(database) {
    db = database;
}