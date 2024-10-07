// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const config = require("./config");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const cafeRoutes = require("./routes/cafe");
// const employeeRoutes = require("./routes/employee");

// app.use("/cafe", cafeRoutes);
// app.use("/employee", employeeRoutes);

// // Add a route for the homepage
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to the Cafe and Employee API!</h1>");
// });

// // Determine which MongoDB URI to use based on the environment
// const mongoUri =
//   process.env.NODE_ENV === "test" ? config.testMongodbUri : config.mongodbUri;

// mongoose
//   .connect(mongoUri, {
//     // Removed deprecated options
//   })
//   .then(() => {
//     app.listen(config.port, () =>
//       console.log(`Server running on port ${config.port}`)
//     );
//   })
//   .catch((err) => console.log(err));

// module.exports = app; // Export the app

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const cafeRoutes = require("./routes/cafe");
const employeeRoutes = require("./routes/employee");

app.use("/cafe", cafeRoutes);
app.use("/employee", employeeRoutes);

// Add a route for the homepage
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Cafe and Employee API!</h1>");
});

// Determine which MongoDB URI to use based on the environment
const mongoUri =
  process.env.NODE_ENV === "test" ? config.testMongodbUri : config.mongodbUri;

// Function to connect to MongoDB
const connectToDatabase = async (uri) => {
  try {
    await mongoose.connect(uri, {
      // Removed deprecated options
    });
    console.log(`Connected to MongoDB at ${uri}`);
  } catch (err) {
    console.error(`Failed to connect to MongoDB at ${uri}: ${err.message}`);
    return false;
  }
  return true;
};

// Attempt to connect to the main database, and fallback to local if it fails
const startServer = async () => {
  const connected = await connectToDatabase(mongoUri);

  if (!connected) {
    console.log("Attempting to connect to the local MongoDB...");
    const localMongoUri = process.env.MONGODB_LOCAL_URI;
    await connectToDatabase(localMongoUri);
  }

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

// Start the server and connect to the database
startServer();

module.exports = app; // Export the app
