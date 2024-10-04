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
const cors = require("cors");
const config = require("./config"); // Import the config

const app = express();
app.use(cors());
app.use(bodyParser.json());

const cafeRoutes = require("./routes/cafe");
const employeeRoutes = require("./routes/employee");

app.use("/cafe", cafeRoutes);
app.use("/employee", employeeRoutes);

mongoose
  .connect(config.mongodbUri, {
    // Use the MongoDB URI from config
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    ); // Use the port from config
  })
  .catch((err) => console.log(err));

module.exports = app; // Export the app
