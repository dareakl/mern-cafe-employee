const express = require("express");
const Cafe = require("../models/Cafe");
const Employee = require("../models/Employee");

const router = express.Router();

// GET /cafes?location=<location>
router.get("/", async (req, res) => {
  const { location } = req.query;

  try {
    let cafes;

    if (location) {
      // If a location is provided, find cafes in that location
      cafes = await Cafe.find({ location });
    } else {
      // If no location is provided, fetch all cafes
      cafes = await Cafe.find();
    }

    // Aggregate to get the number of employees for each café
    const cafesWithEmployeeCount = await Promise.all(
      cafes.map(async (cafe) => {
        const employeeCount = await Employee.countDocuments({
          cafeId: cafe._id,
        });
        return {
          name: cafe.name,
          description: cafe.description,
          employees: employeeCount,
          logo: cafe.logo,
          location: cafe.location,
          id: cafe.id,
        };
      })
    );

    // Sort by number of employees in descending order
    cafesWithEmployeeCount.sort((a, b) => b.employees - a.employees);

    res.json(cafesWithEmployeeCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const cafe = new Cafe(req.body);
    await cafe.save();
    res.status(201).json(cafe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cafe) return res.status(400).json({ error: "Cafe Not Found" });
    res.json(cafe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndDelete(req.params.id);
    if (!cafe) return res.status(404).json({ error: "Cafe not found" });
    await Employee.deleteMany({ cafeId: cafe._id });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
