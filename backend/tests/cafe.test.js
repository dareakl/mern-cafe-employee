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

describe("Cafe API", () => {
  let cafeId;

  test("POST /cafe - Create a cafe", async () => {
    const response = await request(app).post("/cafe").send({
      name: "Cafe Mocha",
      description: "A cozy place for coffee lovers.",
      logo: "https://example.com/logo.png",
      location: "123 Coffee St",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    cafeId = response.body._id; // Store the cafe ID for later tests
  });

  test("GET /cafe - Retrieve cafes", async () => {
    const response = await request(app).get("/cafe");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /cafe/:id - Retrieve a cafe by ID", async () => {
    const response = await request(app).get(`/cafe/${cafeId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", cafeId);
    expect(response.body.name).toBe("Cafe Mocha");
  });

  test("PUT /cafe/:id - Update a cafe", async () => {
    const response = await request(app).put(`/cafe/${cafeId}`).send({
      name: "Cafe Latte",
      description: "A new description for the cafe.",
      logo: "https://example.com/new-logo.png", // Optional, but good to include for testing
      location: "456 Coffee St", // Optional
    });

    // Log the response if it fails
    if (response.status !== 200) {
      console.error("Failed to update cafe:", response.body);
    }

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", cafeId); // Check for _id
    expect(response.body.name).toBe("Cafe Latte");
  });

  test("DELETE /cafe/:id - Delete a cafe", async () => {
    const response = await request(app).delete(`/cafe/${cafeId}`);

    expect(response.status).toBe(204);

    // Verify deletion
    const getResponse = await request(app).get(`/cafe/${cafeId}`);
    expect(getResponse.status).toBe(404);
  });
});
