const EmployeeService = require("../services/employeeService");

class EmployeeController {
  static async getEmployees(req, res) {
    const { cafe } = req.query;

    try {
      const employees = await EmployeeService.getEmployees(cafe);
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEmployeeById(req, res) {
    const { id } = req.params;

    try {
      const employee = await EmployeeService.getEmployeeById(id);
      res.json(employee);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async createEmployee(req, res) {
    try {
      const employeeData = { ...req.body };
      // Generate ID if not provided
      if (!employeeData.id) {
        employeeData.id = generateUniqueId();
      }
      const employee = await EmployeeService.createEmployee(employeeData);
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateEmployee(req, res) {
    const { id } = req.params;

    try {
      const employee = await EmployeeService.updateEmployee(id, req.body);
      res.json(employee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteEmployee(req, res) {
    const { id } = req.params;

    try {
      await EmployeeService.deleteEmployee(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

const generateUniqueId = () => {
  const prefix = "UI";
  const randomChars = [...Array(7)]
    .map(() => Math.random().toString(36)[2])
    .join("");
  return prefix + randomChars.toUpperCase(); // Convert to uppercase for consistency
};

module.exports = EmployeeController;
