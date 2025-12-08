import { describe, it, expect } from "vitest";
import arrayReduce from "../../functions/array-reduce/1.1/index.js";

describe("arrayReduce", () => {
  it("reduces array with sum reducer", async () => {
    const out = await arrayReduce({
      array: [1, 2, 3, 4, 5],
      reducer: "sum",
    });

    expect(out).toEqual({ result: 15 });
  });

  it("reduces array with min reducer", async () => {
    const out = await arrayReduce({
      array: [5, 2, 8, 1, 9],
      reducer: "min",
    });

    expect(out).toEqual({ result: 1 });
  });

  it("reduces array with max reducer", async () => {
    const out = await arrayReduce({
      array: [5, 2, 8, 1, 9],
      reducer: "max",
    });

    expect(out).toEqual({ result: 9 });
  });

  it("reduces array with concat reducer", async () => {
    const out = await arrayReduce({
      array: [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      reducer: "concat",
    });

    expect(out).toEqual({ result: [1, 2, 3, 4, 5, 6] });
  });

  it("reduces array with path and sum reducer", async () => {
    const array = [
      { name: "Alice", score: 85 },
      { name: "Bob", score: 92 },
      { name: "Charlie", score: 78 },
    ];

    const out = await arrayReduce({
      array,
      path: "score",
      reducer: "sum",
    });

    expect(out).toEqual({ result: 255 });
  });

  it("reduces array with nested path and min reducer", async () => {
    const array = [
      { user: { profile: { score: 85 } } },
      { user: { profile: { score: 92 } } },
      { user: { profile: { score: 78 } } },
    ];

    const out = await arrayReduce({
      array,
      path: "user.profile.score",
      reducer: "min",
    });

    expect(out).toEqual({ result: 78 });
  });

  it("reduces array with custom initial value", async () => {
    const out = await arrayReduce({
      array: [1, 2, 3, 4, 5],
      reducer: "sum",
      initialValue: 100,
    });

    expect(out).toEqual({ result: 115 });
  });

  it("reduces array with custom initial value for concat", async () => {
    const out = await arrayReduce({
      array: [
        [1, 2],
        [3, 4],
      ],
      reducer: "concat",
      initialValue: [0],
    });

    expect(out).toEqual({ result: [0, 1, 2, 3, 4] });
  });

  it("reduces empty array with sum and custom initial value", async () => {
    const out = await arrayReduce({
      array: [],
      reducer: "sum",
      initialValue: 10,
    });

    expect(out).toEqual({ result: 10 });
  });

  it("reduces empty array with min and custom initial value", async () => {
    const out = await arrayReduce({
      array: [],
      reducer: "min",
      initialValue: 5,
    });

    expect(out).toEqual({ result: 5 });
  });

  it("reduces empty array with max and custom initial value", async () => {
    const out = await arrayReduce({
      array: [],
      reducer: "max",
      initialValue: 5,
    });

    expect(out).toEqual({ result: 5 });
  });

  it("reduces empty array with concat and custom initial value", async () => {
    const out = await arrayReduce({
      array: [],
      reducer: "concat",
      initialValue: [1, 2],
    });

    expect(out).toEqual({ result: [1, 2] });
  });

  it("reduces array with string values using concat", async () => {
    const out = await arrayReduce({
      array: ["hello", "world", "test"],
      reducer: "concat",
    });

    expect(out).toEqual({ result: ["hello", "world", "test"] });
  });

  it("reduces array with mixed numeric types using sum", async () => {
    const out = await arrayReduce({
      array: [1, "2", 3.5, "4.5"],
      reducer: "sum",
    });

    expect(out).toEqual({ result: 11 });
  });

  it("reduces array with mixed numeric types using min", async () => {
    const out = await arrayReduce({
      array: [1, "2", 3.5, "4.5"],
      reducer: "min",
    });

    expect(out).toEqual({ result: 1 });
  });

  it("reduces array with mixed numeric types using max", async () => {
    const out = await arrayReduce({
      array: [1, "2", 3.5, "4.5"],
      reducer: "max",
    });

    expect(out).toEqual({ result: 4.5 });
  });

  it("throws error when array is not provided", async () => {
    await expect(arrayReduce({ reducer: "sum" })).rejects.toThrow(
      "Array Reduce: Missing required parameters (array and reducer)",
    );
  });

  it("throws error when reducer is not provided", async () => {
    await expect(arrayReduce({ array: [1, 2, 3] })).rejects.toThrow(
      "Array Reduce: Missing required parameters (array and reducer)",
    );
  });

  it("throws error when array is not an array", async () => {
    await expect(
      arrayReduce({ array: "not an array", reducer: "sum" }),
    ).rejects.toThrow(
      "Array Reduce: Missing required parameters (array and reducer)",
    );
  });

  it("throws error when reducer is invalid", async () => {
    await expect(
      arrayReduce({ array: [1, 2, 3], reducer: "invalid" }),
    ).rejects.toThrow('Array Reduce: Invalid reducer "invalid"');
  });

  it("handles array with null values using sum", async () => {
    const out = await arrayReduce({
      array: [1, null, 3, undefined, 5],
      reducer: "sum",
    });

    expect(out).toEqual({ result: 9 });
  });

  it("handles array with null values using min", async () => {
    const out = await arrayReduce({
      array: [1, null, 3, undefined, 5],
      reducer: "min",
    });

    expect(out).toEqual({ result: 0 });
  });

  it("handles array with null values using max", async () => {
    const out = await arrayReduce({
      array: [1, null, 3, undefined, 5],
      reducer: "max",
    });

    expect(out).toEqual({ result: 5 });
  });

  it("handles array with null values using concat", async () => {
    const out = await arrayReduce({
      array: [[1, 2], null, [3, 4], undefined, [5, 6]],
      reducer: "concat",
    });

    expect(out).toEqual({ result: [1, 2, 3, 4, 5, 6] });
  });
});
