import { describe, it, expect, vi, afterEach } from "vitest";
import arrayPush from "../../functions/array-push/1.0/index.js";

describe("arrayPush", () => {
  const originalConsoleLog = console.log;

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it("pushes value to simple array", async () => {
    const out = await arrayPush({
      array: [1, 2, 3],
      data: 4,
    });

    expect(out).toEqual({ result: [1, 2, 3, 4] });
  });

  it("pushes value to array with data property", async () => {
    const array = { data: [1, 2, 3] };

    const out = await arrayPush({
      array,
      data: 4,
    });

    expect(out).toEqual({ result: [1, 2, 3, 4] });
  });

  it("pushes value to array with path mapping", async () => {
    const array = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
    ];

    const out = await arrayPush({
      array,
      path: "name",
      data: "Charlie",
    });

    expect(out).toEqual({ result: ["Alice", "Bob", "Charlie"] });
  });

  it("pushes value to array with nested path", async () => {
    const array = [
      { user: { name: "Alice", age: 25 } },
      { user: { name: "Bob", age: 30 } },
    ];

    const out = await arrayPush({
      array,
      path: "user.name",
      data: "Charlie",
    });

    expect(out).toEqual({ result: ["Alice", "Bob", "Charlie"] });
  });

  it("pushes value with filter when value is not already in array", async () => {
    const out = await arrayPush({
      array: [1, 2, 3],
      data: 4,
      filter: true,
    });

    expect(out).toEqual({ result: [1, 2, 3, 4] });
  });

  it("does not push value with filter when value is already in array", async () => {
    const out = await arrayPush({
      array: [1, 2, 3],
      data: 2,
      filter: true,
    });

    expect(out).toEqual({ result: [1, 2, 3] });
  });

  it("pushes string value with filter when not already in array", async () => {
    const out = await arrayPush({
      array: ["apple", "banana"],
      data: "cherry",
      filter: true,
    });

    expect(out).toEqual({ result: ["apple", "banana", "cherry"] });
  });

  it("does not push string value with filter when already in array", async () => {
    const out = await arrayPush({
      array: ["apple", "banana"],
      data: "apple",
      filter: true,
    });

    expect(out).toEqual({ result: ["apple", "banana"] });
  });

  it("pushes value to empty array", async () => {
    const out = await arrayPush({
      array: [],
      data: "first",
    });

    expect(out).toEqual({ result: ["first"] });
  });

  it("pushes value when array is undefined", async () => {
    const out = await arrayPush({
      array: undefined,
      data: "first",
    });

    expect(out).toEqual({ result: ["first"] });
  });

  it("pushes value when array is null", async () => {
    const out = await arrayPush({
      array: null,
      data: "first",
    });

    expect(out).toEqual({ result: ["first"] });
  });

  it("logs when logging is enabled", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await arrayPush({
      array: [1, 2, 3],
      data: 4,
      logging: true,
    });

    expect(logSpy).toHaveBeenCalledWith("Pushing value to array");
    expect(logSpy).toHaveBeenCalledWith("Result", [1, 2, 3, 4]);
  });

  it("logs path when logging is enabled", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await arrayPush({
      array: [{ name: "Alice" }, { name: "Bob" }],
      path: "name",
      data: "Charlie",
      logging: true,
    });

    expect(logSpy).toHaveBeenCalledWith("path", "name");
  });

  it("logs filter when logging is enabled", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await arrayPush({
      array: [1, 2, 3],
      data: 2,
      filter: true,
      logging: true,
    });

    expect(logSpy).toHaveBeenCalledWith("filter", true);
    expect(logSpy).toHaveBeenCalledWith("Value already in array");
  });

  it("throws error when data is not an array", async () => {
    await expect(
      arrayPush({
        array: "not an array",
        data: "test",
      }),
    ).rejects.toThrow("Array Push failed: data is not an array");
  });

  it("throws error when array item is not an object and path is provided", async () => {
    await expect(
      arrayPush({
        array: ["string", 123],
        path: "name",
        data: "test",
      }),
    ).rejects.toThrow(
      "Array Push failed: Array item is not an object. Cannot travel path",
    );
  });

  it("pushes object to array", async () => {
    const out = await arrayPush({
      array: [{ name: "Alice" }, { name: "Bob" }],
      data: { name: "Charlie" },
    });

    expect(out).toEqual({
      result: [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }],
    });
  });

  it("pushes null value to array", async () => {
    const out = await arrayPush({
      array: [1, 2, 3],
      data: null,
    });

    expect(out).toEqual({ result: [1, 2, 3, null] });
  });

  it("pushes undefined value to array", async () => {
    const out = await arrayPush({
      array: [1, 2, 3],
      data: undefined,
    });

    expect(out).toEqual({ result: [1, 2, 3, undefined] });
  });
});
