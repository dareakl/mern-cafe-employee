const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Your Express app
const Employee = require("../models/Employee");
const Cafe = require("../models/Cafe");

describe("Employee API", () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect("mongodb://localhost/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clean up test data
    await Employee.deleteMany({});
    await Cafe.deleteMany({});
    await mongoose.connection.close();
  });

  test("should create a new employee", async () => {
    const newCafe = new Cafe({ name: "Cafe Test" });
    await newCafe.save();

    const newEmployee = {
      id: "unique_test_id_1",
      name: "Jane Doe",
      email_address: "jane.doe@example.com",
      phone_number: "91234567",
      gender: "Female",
      cafeId: newCafe._id.toString(),
      start_date: new Date(),
    };

    const response = await request(app)
      .post("/api/employees")
      .send(newEmployee);

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(newEmployee.id);
  });

  test("should get employees by café name", async () => {
    const response = await request(app).get("/api/employees?cafe=Cafe Test");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("should get employee details by ID", async () => {
    const employee = await Employee.findOne({ id: "unique_test_id_1" });

    const response = await request(app).get(`/api/employees/${employee._id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(employee.id);
  });

  test("should update an employee", async () => {
    const employee = await Employee.findOne({ id: "unique_test_id_1" });

    const updatedData = {
      name: "Jane Smith",
    };

    const response = await request(app)
      .put(`/api/employees/${employee._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Jane Smith");
  });

  test("should delete an employee", async () => {
    const employee = await Employee.findOne({ id: "unique_test_id_1" });

    const response = await request(app).delete(
      `/api/employees/${employee._id}`
    );
    expect(response.status).toBe(204);
  });
});
