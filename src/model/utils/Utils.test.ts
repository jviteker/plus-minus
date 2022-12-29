import { Utils } from "./Utils";

describe("Utils", () => {
  describe("randomInt", () => {
    it("should return a random integer within the specified range", () => {
      // Generate a random integer between 1 and 10 (inclusive)
      const min = 1;
      const max = 10;
      const randomInt = Utils.randomInt(min, max);

      expect(randomInt).toBeGreaterThanOrEqual(min);
      expect(randomInt).toBeLessThanOrEqual(max);
    });

    it("should return a random integer between 1 and 10 (inclusive) if no range is specified", () => {
      // Generate a random integer between 1 and 10 (inclusive)
      const min = 1;
      const max = 10;
      const randomInt = Utils.randomInt();

      expect(randomInt).toBeGreaterThanOrEqual(min);
      expect(randomInt).toBeLessThanOrEqual(max);
    });
  });

  describe("randomString", () => {
    it("should return a random string of the specified length", () => {
      const length = 6;
      const randomString = Utils.randomString(length);

      expect(randomString).toHaveLength(length);
    });

    it("should return a random string of length 6 if no length is specified", () => {
      const length = 6;
      const randomString = Utils.randomString();

      expect(randomString).toHaveLength(length);
    });
  });
});
