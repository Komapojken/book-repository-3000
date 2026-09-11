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
                            type: "integer",
                            minimum: 1,
                            maximum: 9999
                        },
                        pages: {
                            type: "integer",
                            minimum: 1
                        }
                    }
                },

                PatchBook: {
                    type: "object",
                    description: "One or more fields to update. Omitted fields keep their current values.",
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
                            type: "integer",
                            minimum: 1,
                            maximum: 9999
                        },
                        pages: {
                            type: "integer",
                            minimum: 1
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
        "./src/routes/*.mjs"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;