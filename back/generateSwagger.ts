const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const options = {
  info: {
    title: "발가락 양말",
    description: "감정 일기",
  },
  servers: [
    {
      url: "http://localhost:5001",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./src/swagger/swagger-output.json";
const endpointsFiles = ["./src/app"];

swaggerAutogen(outputFile, endpointsFiles, options);