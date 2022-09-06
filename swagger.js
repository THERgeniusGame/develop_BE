const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "THER genius",
    description: "THER genius API",
  },
  host: "localhost:8000",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      in: "header",
      bearerFormat: "JWT",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
