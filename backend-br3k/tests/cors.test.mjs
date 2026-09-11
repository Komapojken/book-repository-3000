import { describe, it, expect } from "vitest";
import { getAllowedOrigins } from "../src/app.mjs";

describe("CORS configuration", () => {
    
    it("should throw a clear error if CORS_ALLOW_ORIGINS is missing", () => {
        expect(() => getAllowedOrigins(undefined)).toThrow(
            "CORS_ALLOW_ORIGINS is missing. Copy .env.example to .env and set CORS_ALLOW_ORIGINS."
        );
    });

    it("should split origins into an array", () => {
        expect(getAllowedOrigins("http://localhost:3000,http://localhost:3001"))
            .toEqual(["http://localhost:3000", "http://localhost:3001"]);
    });

    it("should trim whitespace around origins", () => {
        expect(getAllowedOrigins("http://localhost:3000, http://localhost:3001"))
            .toEqual(["http://localhost:3000", "http://localhost:3001"]);
    });

    it("should ignore empty origins after split", () => {
        expect(getAllowedOrigins("http://localhost:3000,, http://localhost:3001"))
            .toEqual(["http://localhost:3000", "http://localhost:3001"]);
    });

    it("should throw if origins are only empty values", () => {
        expect(() => getAllowedOrigins(" , , ")).toThrow(
            "CORS_ALLOW_ORIGINS is missing. Copy .env.example to .env and set CORS_ALLOW_ORIGINS."
        );
    });
});