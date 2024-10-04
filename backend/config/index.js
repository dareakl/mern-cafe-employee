const dotenv = require("dotenv");

dotenv.config();

const config = {
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/default",
  testMongodbUri:
    process.env.TEST_MONGODB_URI || "mongodb://localhost:27017/test",
  port: process.env.PORT || 4000,
};

module.exports = config;
