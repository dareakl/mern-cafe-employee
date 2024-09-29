// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const cafeRoutes = require("./routes/cafe");
// const employeeRoutes = require("./routes/employee");

// app.use("/cafe", cafeRoutes);
// app.use("/employee", employeeRoutes);

// const PORT = process.env.PORT || 4000;

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.log(err));

// module.exports = app; // Export the app

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const cafeRoutes = require("./routes/cafe");
const employeeRoutes = require("./routes/employee");

app.use("/cafes", cafeRoutes); // Note the path should be /cafes
app.use("/employee", employeeRoutes);

const PORT = process.env.PORT || 4000;

// Check if the NODE_ENV is set to 'test'
const isTestEnv = process.env.NODE_ENV === "test";

// Use a different database URI for tests
const mongoUri = isTestEnv
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

module.exports = app; // Export the app
