// import { sum } from "./math";

import { expect, test } from "vitest";

// test("sum two numbers", () => {
//   const a = 5;
//   const b = 10;
//   const result = sum(a, b);
//   expect(result).toBeGreaterThan(11);
// });

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test("to be falsy", () => {
  const n = 0;
  expect(n).toBeFalsy();
});

// mathController.test.js
// calculateSum.test.js
// import request from "supertest";
// import app from "../index.js";

// describe("GET /sum", () => {
//   it("just sum", async () => {
//     const response = await request(app).get("/sum");

//     // Optional console output
//     console.log(response.body);

//     // Expect response
//     expect(response.status).toBe(200);
//     expect(response.body.sum).toBe(4);
//     expect(response.body.message).toBe("correct");
//   });
// });


