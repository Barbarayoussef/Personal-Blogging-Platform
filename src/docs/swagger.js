import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Blogging Platform API",
      version: "1.0.0",
    },
    servers: [{ url: "https://your-app.onrender.com" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/modules/**/*.controller.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
