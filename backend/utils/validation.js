const { check, validationResult } = require("express-validator");

const validateCafe = [
  check("name")
    .isString()
    .isLength({ min: 6, max: 10 }) // Name must be between 6 and 10 characters
    .withMessage("Name must be between 6 and 10 characters."),

  check("description")
    .isString()
    .isLength({ max: 256 }) // Description must be a maximum of 256 characters
    .withMessage("Description must be a maximum of 256 characters."),

  check("location").notEmpty().withMessage("Location is required."),
];

const validateEmployee = [
  check("name").notEmpty().withMessage("Name is required."),

  check("email_address")
    .isEmail()
    .withMessage("Must be a valid email address."),

  check("phone_number")
    .matches(/^[89]\d{7}$/)
    .withMessage(
      "Phone number must start with 8 or 9 and have exactly 7 more digits."
    ),

  check("gender")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be either Male or Female."),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateCafe, validateEmployee, validate };
