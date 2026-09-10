import express from "express";
import apiRoutes from "./routes/index.mjs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerConfig.mjs";
import { errorHandler } from "./middleware/errorMiddleware.mjs";

// Origins from env-file
export function getAllowedOrigins(origins) {
    if (!origins) {
        throw new Error("CORS_ALLOW_ORIGINS is missing. Copy .env.example to .env and set CORS_ALLOW_ORIGINS.");
    }
    // Converting to array
    return origins.split(",");
}

export function getPort(port) {
    if (!port) {
        throw new Error("PORT is missing. Copy .env.example to .env and set PORT.");
    }

    return port;
}

const app = express();

app.use(express.json());

const corsOptions = {
    origin: getAllowedOrigins(process.env.CORS_ALLOW_ORIGINS),
};

app.use(cors(corsOptions));

// routes
app.use("/", apiRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;