const express = require("express");
const Employee = require("../models/Employee");
const Cafe = require("../models/Cafe");

const router = express.Router();

router.get("/", async (req, res) => {
  const { cafe } = req.query;

  try {
    let employees;

    if (cafe) {
      // Find employees belonging to the specified cafe
      const cafeDoc = await Cafe.findOne({ name: cafe });
      if (!cafeDoc) return res.status(404).json({ error: "Café not found" });
      employees = await Employee.find({ cafeId: cafeDoc.id });
    } else {
      // If no café is provided, fetch all employees
      employees = await Employee.find();
    }

    // Fetch all cafes to map cafeId to cafe name later
    const cafes = await Cafe.find().lean();
    const cafeMap = cafes.reduce((acc, cafe) => {
      acc[cafe.id] = cafe.name;
      return acc;
    }, {});

    //console.log("Cafe Map:", cafeMap); // Log cafeMap for debugging

    // Calculate days worked and prepare the response
    const currentDate = new Date();
    const employeesWithDaysWorked = employees.map((employee) => {
      const daysWorked = Math.floor(
        (currentDate - new Date(employee.start_date)) / (1000 * 60 * 60 * 24)
      );

      // Log each employee's cafeId for debugging
      // console.log("Employee Cafe ID:", employee.cafeId);

      return {
        _id: employee._id,
        id: employee.id,
        name: employee.name,
        email_address: employee.email_address,
        phone_number: employee.phone_number,
        days_worked: daysWorked,
        cafe: employee.cafeId ? cafeMap[employee.cafeId] || "" : "", // Fetch café name if assigned
      };
    });

    // Sort by days worked in descending order
    employeesWithDaysWorked.sort((a, b) => b.days_worked - a.days_worked);

    res.json(employeesWithDaysWorked);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get employee details by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameters

  try {
    // Fetch the specific employee by ID
    const employee = await Employee.findById(id).lean();
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    // Fetch all cafes to map cafeId to cafe name
    const cafes = await Cafe.find().lean();
    const cafeMap = cafes.reduce((acc, cafe) => {
      acc[cafe._id] = cafe.name; // Use _id for matching
      return acc;
    }, {});

    // Calculate days worked
    const currentDate = new Date();
    const daysWorked = Math.floor(
      (currentDate - new Date(employee.start_date)) / (1000 * 60 * 60 * 24)
    );

    // Return the employee details with the café name
    res.json({
      _id: employee._id,
      id: employee.id,
      name: employee.name,
      email_address: employee.email_address,
      phone_number: employee.phone_number,
      days_worked: daysWorked,
      gender: employee.gender,
      start_date: employee.start_date,
      cafe: employee.cafeId ? cafeMap[employee.cafeId] || "" : "", // Fetch café name if assigned
    });
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
