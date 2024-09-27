const request = require("supertest");
const app = require("../server"); // Ensure server.js exports the app

describe("Employee API", () => {
  it("should create a new employee", async () => {
    const res = await request(app).post("/employee").send({
      id: "UI1234567",
      name: "John Doe",
      email_address: "john@example.com",
      phone_number: "91234567",
      gender: "Male",
      cafeId: "CafeID-12345",
      start_date: new Date(),
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "John Doe");
  });
});
