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

// Determine which MongoDB URI to use based on the environment
const mongoUri =
  process.env.NODE_ENV === "test" ? config.testMongodbUri : config.mongodbUri;

mongoose
  .connect(mongoUri, {
    // Removed deprecated options
  })
  .then(() => {
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  })
  .catch((err) => console.log(err));

module.exports = app; // Export the app
