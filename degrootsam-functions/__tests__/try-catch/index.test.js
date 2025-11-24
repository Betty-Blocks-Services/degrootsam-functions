import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import tryCatch from "../../functions/try-catch/1.1/index.js";

describe("tryCatch", () => {
  const originalConsoleLog = console.log;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    // Make sure we don’t leave console patched if any test overrides it.
    console.log = originalConsoleLog;
  });

  it("returns { result } on success and logs the result", async () => {
    const steps = vi.fn().mockResolvedValue("OK");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const out = await tryCatch({ errorMessage: null, logging: false }, steps);

    expect(steps).toHaveBeenCalledTimes(1);
    expect(out).toEqual({ result: "OK" });
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("OK");
  });

  it("returns { as: errorMessage } on error when errorMessage is provided", async () => {
    const err = new Error("boom");
    const steps = vi.fn().mockRejectedValue(err);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const out = await tryCatch(
      { errorMessage: "Something went wrong", logging: true },
      steps,
    );

    expect(steps).toHaveBeenCalledTimes(1);
    expect(out).toEqual({ as: "Something went wrong" });
    // Should log only the error object from the catch block
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith({ error: err });
  });

  it("returns { as: error } on error when errorMessage is NOT provided", async () => {
    const err = new Error("kaboom");
    const steps = vi.fn().mockRejectedValue(err);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const out = await tryCatch(
      { errorMessage: undefined, logging: false },
      steps,
    );

    expect(steps).toHaveBeenCalledTimes(1);
    expect(out).toEqual({ as: err }); // note: function returns the actual error object
    // No logging expected because logging=false and success path didn’t run
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("awaits the async steps function", async () => {
    const order = [];
    const steps = vi.fn(async () => {
      order.push("steps-start");
      await new Promise((r) => setTimeout(r, 5));
      order.push("steps-end");
      return 42;
    });
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const out = await tryCatch({ errorMessage: null, logging: false }, steps);

    expect(out).toEqual({ result: 42 });
    expect(order).toEqual(["steps-start", "steps-end"]);
    expect(logSpy).toHaveBeenCalledWith(42);
  });
});
