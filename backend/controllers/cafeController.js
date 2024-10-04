// Import the CafeService to interact with cafe data
const CafeService = require("../services/cafeService");

class CafeController {
  // Fetch all cafes based on location query parameter
  static async getCafes(req, res) {
    const { location } = req.query;

    try {
      // Call the service to get cafes based on the specified location
      const cafes = await CafeService.getCafes(location);
      res.json(cafes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Fetch a single cafe by its ID
  static async getCafeById(req, res) {
    const { id } = req.params;

    try {
      // Call the service to get a cafe by its ID
      const cafe = await CafeService.getCafeById(id);
      res.json(cafe);
    } catch (error) {
      // Handle errors, responding with a 404 status if the cafe is not found
      res.status(404).json({ error: error.message });
    }
  }
  // Create a new cafe
  static async createCafe(req, res) {
    try {
      const cafe = await CafeService.createCafe(req.body);
      res.status(201).json(cafe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an existing cafe by its ID
  static async updateCafe(req, res) {
    const { id } = req.params;

    try {
      const cafe = await CafeService.updateCafe(id, req.body);
      res.json(cafe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Delete a cafe by its ID
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
