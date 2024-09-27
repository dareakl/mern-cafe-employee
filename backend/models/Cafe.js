const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  location: { type: String, required: true },
  id: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Cafe", cafeSchema);
