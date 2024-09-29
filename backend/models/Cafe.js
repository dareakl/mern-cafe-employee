const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: false },
  location: { type: String, required: true },
  id: { type: String, required: true, unique: true, default: uuidv4 },
});

module.exports = mongoose.model("Cafe", cafeSchema);
