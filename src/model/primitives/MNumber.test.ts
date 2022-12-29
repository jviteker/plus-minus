import { MNumber } from "./MNumber";

describe("MNumber", () => {
  describe("constructor", () => {
    it("should create an instance of MNumber with the correct value", () => {
      const mNumber = new MNumber(42);
      expect(mNumber).toBeInstanceOf(MNumber);
      expect(mNumber.getNumericValue()).toBe(42);
    });
  });

  describe("toString", () => {
    it("should return the string representation of the value", () => {
      const mNumber = new MNumber(42);
      expect(mNumber.toString()).toBe("42");
    });
  });

  describe("getNumericValue", () => {
    it("should return the numeric value", () => {
      const mNumber = new MNumber(42);
      expect(mNumber.getNumericValue()).toBe(42);
    });
  });

  describe("create", () => {
    it("should create a new instance of MNumber with the correct value", () => {
      const mNumber = MNumber.create(42);
      expect(mNumber).toBeInstanceOf(MNumber);
      expect(mNumber.getNumericValue()).toBe(42);
    });
  });
});
