const express = require("express");
const Employee = require("../models/Employee");
const Cafe = require("../models/Cafe");

const router = express.Router();

// GET /employees?cafe=<café>
router.get("/", async (req, res) => {
  const { cafe } = req.query;

  try {
    let employees;

    if (cafe) {
      // Find employees belonging to the specified cafe
      const cafeDoc = await Cafe.findOne({ name: cafe });
      if (!cafeDoc) return res.status(404).json({ error: "Café not found" });
      employees = await Employee.find({ cafeId: cafeDoc._id });
    } else {
      // If no café is provided, fetch all employees
      employees = await Employee.find();
    }

    // Calculate days worked and prepare the response
    const currentDate = new Date();
    const employeesWithDaysWorked = employees.map((employee) => {
      const daysWorked = Math.floor(
        (currentDate - new Date(employee.start_date)) / (1000 * 60 * 60 * 24)
      );
      return {
        id: employee.id,
        name: employee.name,
        email_address: employee.email_address,
        phone_number: employee.phone_number,
        days_worked: daysWorked,
        cafe: employee.cafeId ? cafe : "", // Fetch café name if assigned
      };
    });

    // Sort by days worked in descending order
    employeesWithDaysWorked.sort((a, b) => b.days_worked - a.days_worked);

    res.json(employeesWithDaysWorked);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) return res.status(400).json({ error: "Employee Not Found" });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(400).json({ error: "Employee Not Found" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
