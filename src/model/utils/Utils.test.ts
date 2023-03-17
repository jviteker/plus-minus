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

    it("should generate even distribution of numbers", () => {
      // Generate a random integer between 1 and 10 (inclusive)
      const min = 1;
      const max = 10;
      const sampleSize = 10000; // Number of random integers to generate

      const counts = new Array(max - min + 1).fill(0);

      for (let i = 0; i < sampleSize; i++) {
        const rand = Utils.randomInt(min, max);
        counts[rand - min]++;
      }

      const expectedCount = sampleSize / counts.length;
      const tolerance = expectedCount * 0.1; // Allow for 10% deviation from expected count

      for (let i = 0; i < counts.length; i++) {
        expect(counts[i]).toBeGreaterThan(expectedCount - tolerance);
        expect(counts[i]).toBeLessThan(expectedCount + tolerance);
      }
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

  describe("random", () => {
    const min = 0;
    const max = 1;
    const bucketsCount = 20;
    const sampleSize = 100000; // Number of random floats to generate

    it(`generates random floats evenly between ${min} and ${max}`, () => {
      const counts = new Array(bucketsCount).fill(0);

      const expectedCount = sampleSize / counts.length;
      const tolerance = expectedCount * 0.05; // Allow for 10% deviation from expected count

      for (let i = 0; i < sampleSize; i++) {
        const rand = Utils.random(min, max);
        const bucket = Math.floor(rand * counts.length);
        counts[bucket]++;
      }

      for (let i = 0; i < counts.length; i++) {
        const bucketCount = counts[i] - expectedCount;

        expect(bucketCount).toBeGreaterThan(-tolerance);
        expect(bucketCount).toBeLessThan(tolerance);
      }
    });
  });
});
