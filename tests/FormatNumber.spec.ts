import formatNumber from "../src/FormatNumber";

describe("formatNumber", () => {
  test("returns a number prefixed with 0 when the index + 1 is less than 10", () => {
    expect(formatNumber(0)).toBe("01");
    expect(formatNumber(8)).toBe("09");
  });

  test("returns a number without prefix when the index + 1 is 10 or greater", () => {
    expect(formatNumber(9)).toBe("10");
    expect(formatNumber(10)).toBe("11");
  });
});
