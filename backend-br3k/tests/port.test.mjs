import { describe, it, expect } from "vitest";
import { getPort } from "../src/app.mjs";

describe("PORT configuration", () => {

    it("should throw a clear error if PORT is missing", () => {
        expect(() => getPort(undefined)).toThrow("PORT is missing. Copy .env.example to .env and set PORT.");
    });

    it("should return the port when it is set", () => {
        expect(getPort("3001")).toBe("3001");
    });
});