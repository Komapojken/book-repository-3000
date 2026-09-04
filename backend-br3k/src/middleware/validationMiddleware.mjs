import { body, validationResult } from "express-validator";

export const validateCreateBook = [
    body("title")
        .exists()
        .withMessage("Title is required")
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("author")
        .exists()
        .withMessage("Author is required")
        .notEmpty()
        .withMessage("Author name cannot be empty"),

    body("genre")
        .exists()
        .withMessage("Genre is required")
        .notEmpty()
        .withMessage("Genre cannot be empty"),

    body("publishedYear")
        .exists()
        .withMessage("Published year is required")
        .isInt()
        .withMessage("Published year must be an integer"),

    body("pages")
        .exists()
        .withMessage("Pages is required")
        .isInt()
        .withMessage("Pages must be an integer"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
];