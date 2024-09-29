const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email_address: { type: String, required: true, match: /.+@.+\..+/ },
  phone_number: {
    type: String,
    required: true,
    match: /^[89]\d{7}$/, // Ensure it matches the regex for 8-digit numbers starting with 8 or 9
    validate: {
      validator: function (v) {
        return /^[89]\d{7}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It must start with 8 or 9 and have exactly 7 more digits (total of 8 digits).`,
    },
  },
  gender: { type: String, required: true, enum: ["Male", "Female"] },
  cafeId: { type: String, required: true }, // Change this to String
  start_date: { type: Date, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
