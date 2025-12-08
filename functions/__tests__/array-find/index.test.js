import { describe, it, expect, vi, afterEach } from "vitest";
import arrayFind from "../../functions/array-find/1.1/index.js";

describe("arrayFind", () => {
  const originalConsoleLog = console.log;

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it("finds element with equality operator", async () => {
    const out = await arrayFind({
      array: [1, 2, 3, 4, 5],
      path: undefined,
      value: 3,
      operator: "eq",
    });

    expect(out).toEqual({ result: 3 });
  });

  it("finds element with greater than operator", async () => {
    const out = await arrayFind({
      array: [1, 2, 3, 4, 5],
      path: undefined,
      value: 3,
      operator: "gt",
    });

    expect(out).toEqual({ result: 4 });
  });

  it("finds element with contains operator on strings", async () => {
    const out = await arrayFind({
      array: ["apple", "banana", "cherry", "date"],
      path: undefined,
      value: "an",
      operator: "cont",
    });

    expect(out).toEqual({ result: "banana" });
  });

  it("finds element with path and operator", async () => {
    const array = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 35 },
    ];

    const out = await arrayFind({
      array,
      path: "age",
      value: 30,
      operator: "eq",
    });

    expect(out).toEqual({ result: { name: "Bob", age: 30 } });
  });

  it("finds element with nested path", async () => {
    const array = [
      { user: { name: "Alice", age: 25 } },
      { user: { name: "Bob", age: 30 } },
      { user: { name: "Charlie", age: 35 } },
    ];

    const out = await arrayFind({
      array,
      path: "user.age",
      value: 30,
      operator: "eq",
    });

    expect(out).toEqual({ result: { user: { name: "Bob", age: 30 } } });
  });

  it("finds element with not equal operator", async () => {
    const out = await arrayFind({
      array: [3, 3, 3, 4, 5],
      path: undefined,
      value: 3,
      operator: "ne",
    });

    expect(out).toEqual({ result: 4 });
  });

  it("finds element with less than operator", async () => {
    const out = await arrayFind({
      array: [1, 2, 3, 4, 5],
      path: undefined,
      value: 3,
      operator: "lt",
    });

    expect(out).toEqual({ result: 1 });
  });

  it("finds element with greater than or equal operator", async () => {
    const out = await arrayFind({
      array: [1, 2, 3, 4, 5],
      path: undefined,
      value: 3,
      operator: "gte",
    });

    expect(out).toEqual({ result: 3 });
  });

  it("finds element with not contains operator", async () => {
    const out = await arrayFind({
      array: ["apple", "banana", "cherry", "date"],
      path: undefined,
      value: "an",
      operator: "ncont",
    });

    expect(out).toEqual({ result: "apple" });
  });

  it("returns undefined when no element matches", async () => {
    const out = await arrayFind({
      array: [1, 2, 3, 4, 5],
      path: undefined,
      value: 10,
      operator: "eq",
    });

    expect(out).toEqual({ result: undefined });
  });

  it("handles string values correctly", async () => {
    const out = await arrayFind({
      array: ["hello", "world", "test"],
      path: undefined,
      value: "world",
      operator: "eq",
    });

    expect(out).toEqual({ result: "world" });
  });

  it("handles number values correctly", async () => {
    const out = await arrayFind({
      array: [10, 20, 30],
      path: undefined,
      value: "20",
      operator: "eq",
    });

    expect(out).toEqual({ result: 20 });
  });

  it("throws error when array is missing", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await expect(
      arrayFind({ path: "test", value: 3, operator: "eq" }),
    ).rejects.toThrow(
      "Array Find: Missing required parameters to filter array",
    );

    expect(logSpy).toHaveBeenCalledWith({
      array: undefined,
      path: "test",
      value: 3,
      operator: "eq",
    });
  });

  it("throws error when value is missing", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await expect(
      arrayFind({ array: [1, 2, 3], path: "test", operator: "eq" }),
    ).rejects.toThrow(
      "Array Find: Missing required parameters to filter array",
    );

    expect(logSpy).toHaveBeenCalledWith({
      array: [1, 2, 3],
      path: "test",
      value: undefined,
      operator: "eq",
    });
  });

  it("throws error when operator is missing", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await expect(
      arrayFind({ array: [1, 2, 3], path: "test", value: 3 }),
    ).rejects.toThrow(
      "Array Find: Missing required parameters to filter array",
    );

    expect(logSpy).toHaveBeenCalledWith({
      array: [1, 2, 3],
      path: "test",
      value: 3,
      operator: undefined,
    });
  });

  it("throws error when operator is invalid", async () => {
    await expect(
      arrayFind({
        array: [1, 2, 3],
        path: "test",
        value: 3,
        operator: "invalid",
      }),
    ).rejects.toThrow("Invalid operator");
  });

  it("throws error for invalid value type", async () => {
    const array = [null, undefined, Symbol("test")];

    await expect(
      arrayFind({ array, path: "test", value: 3, operator: "eq" }),
    ).rejects.toThrow("Invalid value type");
  });
});
