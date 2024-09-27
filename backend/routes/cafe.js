const express = require("express");
const Cafe = require("../models/Cafe");

const router = express.Router();

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
