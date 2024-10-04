const CafeService = require("../services/cafeService");

class CafeController {
  static async getCafes(req, res) {
    const { location } = req.query;

    try {
      const cafes = await CafeService.getCafes(location);
      res.json(cafes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCafeById(req, res) {
    const { id } = req.params;

    try {
      const cafe = await CafeService.getCafeById(id);
      res.json(cafe);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async createCafe(req, res) {
    try {
      const cafe = await CafeService.createCafe(req.body);
      res.status(201).json(cafe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateCafe(req, res) {
    const { id } = req.params;

    try {
      const cafe = await CafeService.updateCafe(id, req.body);
      res.json(cafe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteCafe(req, res) {
    const { id } = req.params;

    try {
      await CafeService.deleteCafe(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = CafeController;
