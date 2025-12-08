import { describe, it, expect } from "vitest";
import arrayCount from "../../functions/array-count/1.0/index.js";

describe("arrayCount", () => {
  it("counts elements in a valid array", async () => {
    const out = await arrayCount({ array: [1, 2, 3, 4, 5] });

    expect(out).toEqual({ result: 5 });
  });

  it("counts elements in an empty array", async () => {
    const out = await arrayCount({ array: [] });

    expect(out).toEqual({ result: 0 });
  });

  it("counts elements in an array with mixed types", async () => {
    const out = await arrayCount({
      array: [1, "string", true, null, undefined],
    });

    expect(out).toEqual({ result: 5 });
  });

  it("throws error when array is not provided", async () => {
    await expect(arrayCount({})).rejects.toThrow(
      "Unable to count array: Provided array is not valid",
    );
  });

  it("throws error when array is null", async () => {
    await expect(arrayCount({ array: null })).rejects.toThrow(
      "Unable to count array: Provided array is not valid",
    );
  });

  it("throws error when array is undefined", async () => {
    await expect(arrayCount({ array: undefined })).rejects.toThrow(
      "Unable to count array: Provided array is not valid",
    );
  });

  it("throws error when input is not an array", async () => {
    await expect(arrayCount({ array: "not an array" })).rejects.toThrow(
      "Unable to count array: Provided array is not valid",
    );
  });

  it("throws error when input is an object", async () => {
    await expect(arrayCount({ array: { data: [1, 2, 3] } })).rejects.toThrow(
      "Unable to count array: Provided array is not valid",
    );
  });

  it("throws error when input is a number", async () => {
    await expect(arrayCount({ array: 123 })).rejects.toThrow(
      "Unable to count array: Provided array is not valid",
    );
  });
});
