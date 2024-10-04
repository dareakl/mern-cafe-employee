const Employee = require("../models/Employee");
const Cafe = require("../models/Cafe");

class EmployeeService {
  static async getEmployees(cafeName) {
    let employees;
    // If a cafe name is provided, find the corresponding cafe document
    if (cafeName) {
      const cafeDoc = await Cafe.findOne({ name: cafeName });
      if (!cafeDoc) throw new Error("Café not found");
      // Find employees associated with the found cafe
      employees = await Employee.find({ cafeId: cafeDoc.id });
    } else {
      // If no cafe name is provided, fetch all employees
      employees = await Employee.find();
    }
    // Fetch all cafes to create a mapping from cafe ID to cafe name
    const cafes = await Cafe.find().lean();
    const cafeMap = cafes.reduce((acc, cafe) => {
      acc[cafe.id] = cafe.name;
      return acc;
    }, {});

    const currentDate = new Date();
    return (
      employees
        .map((employee) => {
          // Calculate the number of days worked based on start date
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
        // Sort employees by days worked in descending order
        .sort((a, b) => b.days_worked - a.days_worked)
    );
  }
  // Fetch a specific employee by their ID
  static async getEmployeeById(id) {
    const employee = await Employee.findById(id).lean();
    if (!employee) throw new Error("Employee not found");

    const cafes = await Cafe.find().lean();
    const cafeMap = cafes.reduce((acc, cafe) => {
      acc[cafe._id] = cafe.name;
      return acc;
    }, {});
    // Calculate the number of days worked based on start date
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
  // Create a new employee with the provided data
  static async createEmployee(employeeData) {
    const employee = new Employee(employeeData);
    return await employee.save();
  }
  // Update an existing employee by their ID with the provided data
  static async updateEmployee(id, employeeData) {
    const employee = await Employee.findByIdAndUpdate(id, employeeData, {
      new: true,
    });
    if (!employee) throw new Error("Employee Not Found");
    return employee;
  }
  // Delete an employee by their ID
  static async deleteEmployee(id) {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) throw new Error("Employee Not Found");
  }
}

module.exports = EmployeeService;
