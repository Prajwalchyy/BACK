import { sum } from "./math";

test("sum two numbers", () => {
  const a = 5;
  const b = 10;
  const result = sum(a, b);
  expect(result).toBeGreaterThan(11);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test('to be falsy',()=>{
const n=0
expect(n).toBeFalsy();
})
