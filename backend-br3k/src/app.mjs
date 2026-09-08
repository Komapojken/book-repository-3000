import express from "express";
import apiRoutes from "./routes/index.mjs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerConfig.mjs";

const app = express();

app.use(express.json());

// Origins from env-file
const origins = process.env.CORS_ALLOW_ORIGINS;
// Converting to array
const allowedOrigins = origins.split(',');

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

// routes
app.use("/", apiRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;