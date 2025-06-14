import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../index.js";

describe("POST /Users/UserLogin", () => {
  it("should return 200 status and accept email, password, role", async () => {
    const userData = {
      email: "admin1@gmail.com",
      password: "12345",
      role: "admin",
    };

    const response = await request(app)
      .post("/Users/UserLogin")
      .send(userData)
      .set("Accept", "application/json");

    // console.log(response.body);

    expect(response.status).toBe(200);
  });
});
