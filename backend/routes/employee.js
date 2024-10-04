const express = require("express");
const EmployeeController = require("../controllers/employeeController");
const { validateEmployee, validate } = require("../utils/validation");

const router = express.Router();
// Route to get a list of all employees
router.get("/", EmployeeController.getEmployees);
// Route to get a specific employee by their ID
router.get("/:id", EmployeeController.getEmployeeById);
// Route to create a new employee
// Apply validation middleware to check employee data before creation
router.post("/", validateEmployee, validate, EmployeeController.createEmployee);
// Route to update an existing employee by their ID
// Apply validation middleware to check updated employee data
router.put(
  "/:id",
  validateEmployee,
  validate,
  EmployeeController.updateEmployee
);
// Route to delete an employee by their ID
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;
