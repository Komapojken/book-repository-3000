import { body, query, validationResult } from "express-validator";

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }

    next();
}

export const validateCreateBook = [
    body("title")
        .customSanitizer((value) => String(value).replace(/<[^>]*>/g, ""))
        .trim()
        .exists()
        .withMessage("Title is required")
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("author")
        .customSanitizer((value) => String(value).replace(/<[^>]*>/g, ""))
        .trim()
        .exists()
        .withMessage("Author is required")
        .notEmpty()
        .withMessage("Author name cannot be empty"),

    body("genre")
        .customSanitizer((value) => String(value).replace(/<[^>]*>/g, ""))
        .trim()
        .exists()
        .withMessage("Genre is required")
        .notEmpty()
        .withMessage("Genre cannot be empty"),

    body("publishedYear")
        .exists()
        .withMessage("Published year is required")
        .toInt()
        .isInt({ min: 1, max: 9999 })
        .withMessage("Published year must be an integer between 1 and 9999"),

    body("pages")
        .exists()
        .withMessage("Pages is required")
        .toInt()
        .isInt({ min: 1 })
        .withMessage("Pages must be an integer of at least 1"),

    handleValidationErrors
];

export const validateGetBooks = [
    query("page")
        .optional()
        .toInt()
        .isInt({ min: 1 })
        .withMessage("Page must be an integer of at least 1"),

    handleValidationErrors
];