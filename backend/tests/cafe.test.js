const request = require("supertest");
const app = require("../server"); // Ensure server.js exports the app
const mongoose = require("mongoose");
const Cafe = require("../models/Cafe");
const Employee = require("../models/Employee");

describe("Café API", () => {
  beforeAll(async () => {
    // Connect to the test database (you should set this up in your server file)
    await mongoose.connect("mongodb://127.0.0.1:27017/testing", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clean up the database and close the connection
    await Cafe.deleteMany({});
    await Employee.deleteMany({});
    await mongoose.connection.close();
  });

  it("should create a new café", async () => {
    const res = await request(app).post("/cafes").send({
      name: "Coffee House",
      description: "A cozy place for coffee lovers.",
      logo: "logo.png",
      location: "Downtown",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Coffee House");
    expect(res.body).toHaveProperty("location", "Downtown");
  });

  it("should get all cafés", async () => {
    const res = await request(app).get("/cafes");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get cafés by location", async () => {
    const res = await request(app).get("/cafes?location=Downtown");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get café details by ID", async () => {
    const cafe = await Cafe.create({
      name: "Tea House",
      description: "A quiet spot for tea lovers.",
      logo: "tea_logo.png",
      location: "Uptown",
    });

    const res = await request(app).get(`/cafes/${cafe._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Tea House");
  });

  it("should update a café", async () => {
    const cafe = await Cafe.create({
      name: "Old Café",
      description: "An old classic.",
      logo: "old_logo.png",
      location: "Midtown",
    });

    const res = await request(app).put(`/cafes/${cafe._id}`).send({
      name: "Updated Café",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Updated Café");
  });

  it("should delete a café", async () => {
    const cafe = await Cafe.create({
      name: "Delete Me Café",
      description: "A café that will be deleted.",
      logo: "delete_logo.png",
      location: "Anywhere",
    });

    const res = await request(app).delete(`/cafes/${cafe._id}`);
    expect(res.statusCode).toEqual(204);

    const deletedCafe = await Cafe.findById(cafe._id);
    expect(deletedCafe).toBeNull();
  });
});
