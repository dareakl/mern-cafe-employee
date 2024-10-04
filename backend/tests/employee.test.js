const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

jest.setTimeout(10000); // Set timeout to 10 seconds

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.TEST_MONGODB_URI, {
    // Removed deprecated options
  });
  console.log("Connected to test MongoDB.");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Employee API", () => {
  let employeeId;

  test("POST /employee - Create an employee", async () => {
    const response = await request(app).post("/employee").send({
      name: "John Doe",
      email_address: "john@example.com",
      phone_number: "91234567",
      gender: "Male",
      cafeId: "someCafeId",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    employeeId = response.body._id; // Store the employee ID for later tests
  });

  test("GET /employee - Retrieve employees", async () => {
    const response = await request(app).get("/employee");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /employee/:id - Retrieve an employee by ID", async () => {
    const response = await request(app).get(`/employee/${employeeId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", employeeId);
    expect(response.body.name).toBe("John Doe");
  });

  test("PUT /employee/:id - Update an employee", async () => {
    const response = await request(app).put(`/employee/${employeeId}`).send({
      name: "Jane Doe",
      email_address: "jane@example.com", // Optional, but good to include for testing
      phone_number: "91234567", // Optional, for validation
      gender: "Male", // Optional
      cafeId: "someCafeId", // Optional
    });

    // Log the response if it fails
    if (response.status !== 200) {
      console.error("Failed to update employee:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", employeeId); // Check for _id
    expect(response.body.name).toBe("Jane Doe");
  });

  test("DELETE /employee/:id - Delete an employee", async () => {
    const response = await request(app).delete(`/employee/${employeeId}`);

    expect(response.status).toBe(204);

    // Verify deletion
    const getResponse = await request(app).get(`/employee/${employeeId}`);
    expect(getResponse.status).toBe(404);
  });
});
