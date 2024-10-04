const express = require("express");
const CafeController = require("../controllers/cafeController");
const { validateCafe, validate } = require("../utils/validation");

const router = express.Router();
// Route to get a list of all cafes
router.get("/", CafeController.getCafes);
// Route to get a specific cafe by its ID
router.get("/:id", CafeController.getCafeById);
// Route to create a new cafe
// Apply validation middleware to check cafe data before creating
router.post("/", validateCafe, validate, CafeController.createCafe); // Apply validation here
// Route to update an existing cafe by its ID
// Apply validation middleware to check updated cafe data
router.put("/:id", validateCafe, validate, CafeController.updateCafe); // Apply validation here
// Route to delete a cafe by its ID
router.delete("/:id", CafeController.deleteCafe);

module.exports = router;
