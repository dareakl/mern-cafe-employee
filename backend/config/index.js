// // Import the dotenv module to handle environment variables
// const dotenv = require("dotenv");

// // Load environment variables from a .env file into process.env
// dotenv.config();

// // Configuration object to store application settings
// const config = {
//   // MongoDB URI for the main database, defaults to local if not specified
//   mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/default",

//   // MongoDB URI for the test database, defaults to local if not specified
//   testMongodbUri:
//     process.env.TEST_MONGODB_URI || "mongodb://localhost:27017/test",

//   // Port on which the server will listen, defaults to 4000 if not specified
//   port: process.env.PORT || 4000,
// };

// // Export the configuration object for use in other parts of the application
// module.exports = config;

// Import the dotenv module to handle environment variables
const dotenv = require("dotenv");

// Load environment variables from a .env file into process.env
dotenv.config();

// Configuration object to store application settings
const config = {
  // MongoDB URI for the main database, defaults to local if not specified
  mongodbUri: process.env.MONGODB_URI || process.env.MONGODB_LOCAL_URI,

  // MongoDB URI for the test database, defaults to local if not specified
  testMongodbUri:
    process.env.TEST_MONGODB_URI || process.env.TEST_MONGODB_LOCAL_URI,

  // Port on which the server will listen, defaults to 4000 if not specified
  port: process.env.PORT || 4000,
};

// Export the configuration object for use in other parts of the application
module.exports = config;
