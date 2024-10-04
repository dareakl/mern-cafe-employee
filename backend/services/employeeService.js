const Employee = require("../models/Employee");
const Cafe = require("../models/Cafe");

class EmployeeService {
  static async getEmployees(cafeName) {
    let employees;

    if (cafeName) {
      const cafeDoc = await Cafe.findOne({ name: cafeName });
      if (!cafeDoc) throw new Error("Café not found");
      employees = await Employee.find({ cafeId: cafeDoc.id });
    } else {
      employees = await Employee.find();
    }

    const cafes = await Cafe.find().lean();
    const cafeMap = cafes.reduce((acc, cafe) => {
      acc[cafe.id] = cafe.name;
      return acc;
    }, {});

    const currentDate = new Date();
    return employees
      .map((employee) => {
        const daysWorked = employee.start_date
          ? Math.floor(
              (currentDate - new Date(employee.start_date)) /
                (1000 * 60 * 60 * 24)
            )
          : null;

        return {
          _id: employee._id,
          id: employee.id,
          name: employee.name,
          email_address: employee.email_address,
          phone_number: employee.phone_number,
          days_worked: daysWorked,
          cafe: employee.cafeId ? cafeMap[employee.cafeId] || "" : "",
        };
      })
      .sort((a, b) => b.days_worked - a.days_worked);
  }

  static async getEmployeeById(id) {
    const employee = await Employee.findById(id).lean();
    if (!employee) throw new Error("Employee not found");

    const cafes = await Cafe.find().lean();
    const cafeMap = cafes.reduce((acc, cafe) => {
      acc[cafe._id] = cafe.name;
      return acc;
    }, {});

    const daysWorked = employee.start_date
      ? Math.floor(
          (new Date() - new Date(employee.start_date)) / (1000 * 60 * 60 * 24)
        )
      : null;

    return {
      _id: employee._id,
      id: employee.id,
      name: employee.name,
      email_address: employee.email_address,
      phone_number: employee.phone_number,
      days_worked: daysWorked,
      gender: employee.gender,
      start_date: employee.start_date,
      cafe: employee.cafeId ? cafeMap[employee.cafeId] || "" : "",
    };
  }

  static async createEmployee(employeeData) {
    const employee = new Employee(employeeData);
    return await employee.save();
  }

  static async updateEmployee(id, employeeData) {
    const employee = await Employee.findByIdAndUpdate(id, employeeData, {
      new: true,
    });
    if (!employee) throw new Error("Employee Not Found");
    return employee;
  }

  static async deleteEmployee(id) {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) throw new Error("Employee Not Found");
  }
}

module.exports = EmployeeService;
