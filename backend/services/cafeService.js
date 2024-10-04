const Cafe = require("../models/Cafe");
const Employee = require("../models/Employee");

class CafeService {
  static async getCafes(location) {
    let cafes;

    if (location) {
      cafes = await Cafe.find({ location });
    } else {
      cafes = await Cafe.find();
    }

    return Promise.all(
      cafes.map(async (cafe) => {
        const employeeCount = await Employee.countDocuments({
          cafeId: cafe.id,
        });
        return {
          _id: cafe._id,
          name: cafe.name,
          description: cafe.description,
          employees: employeeCount,
          logo: cafe.logo,
          location: cafe.location,
          id: cafe.id,
        };
      })
    ).then((cafesWithEmployeeCount) =>
      cafesWithEmployeeCount.sort((a, b) => b.employees - a.employees)
    );
  }

  static async getCafeById(id) {
    const cafe = await Cafe.findById(id).lean();
    if (!cafe) throw new Error("Café not found");

    const employeeCount = await Employee.countDocuments({ cafeId: cafe._id });

    return {
      _id: cafe._id,
      name: cafe.name,
      description: cafe.description,
      logo: cafe.logo,
      location: cafe.location,
      employees: employeeCount,
      id: cafe.id,
    };
  }

  static async createCafe(data) {
    const cafe = new Cafe(data);
    return await cafe.save();
  }

  static async updateCafe(id, data) {
    const cafe = await Cafe.findByIdAndUpdate(id, data, { new: true });
    if (!cafe) throw new Error("Cafe Not Found");
    return cafe;
  }

  static async deleteCafe(id) {
    const cafe = await Cafe.findByIdAndDelete(id);
    if (!cafe) throw new Error("Cafe not found");
    await Employee.deleteMany({ cafeId: cafe._id });
  }
}

module.exports = CafeService;
