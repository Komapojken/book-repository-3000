import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Book Repository 3000 API",
            version: "1.0.0",
            description: "REST API for managing books."
        },

        components: {
            schemas: {
                CreateBook: {
                    type: "object",
                    required: [
                        "title",
                        "author",
                        "genre",
                        "publishedYear",
                        "pages"
                    ],
                    properties: {
                        title: {
                            type: "string"
                        },
                        author: {
                            type: "string"
                        },
                        genre: {
                            type: "string"
                        },
                        publishedYear: {
                            type: "integer"
                        },
                        pages: {
                            type: "integer"
                        }
                    }
                },

                Book: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/CreateBook"
                        },
                        {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string"
                                }
                            }
                        }
                    ]
                },

                PaginatedBooks: {
                    type: "object",
                    properties: {
                        items: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Book"
                            }
                        },
                        page: {
                            type: "integer",
                            example: 1
                        },
                        pageSize: {
                            type: "integer",
                            nullable: true,
                            example: 5
                        }
                    }
                },

                Error: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Internal server error"
                        }
                    }
                }
            }
        },
    },
    
    apis: [
        "./src/routes/*.mjs",
        "./src/controllers/*.mjs"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;