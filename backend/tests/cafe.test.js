const request = require("supertest");
const app = require("../server"); // Ensure server.js exports the app

describe("Café API", () => {
  it("should create a new café", async () => {
    const res = await request(app).post("/cafe").send({
      name: "Coffee House",
      description: "A cozy place for coffee lovers.",
      logo: "logo.png",
      location: "Downtown",
      id: "UUID-12345",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Coffee House");
  });
});
