import { MNumber } from "./MNumber";

describe("MNumber", () => {
  describe(".random()", () => {
    it(`should generate random int number distributed evenly`, () => {
      const min = 0;
      const max = 9;
      const bucketsCount = 10;
      const sampleSize = 100000; // Number of random numbers to generate

      const counts = new Array(bucketsCount).fill(0);

      const expectedCount = sampleSize / counts.length;
      const tolerance = expectedCount * 0.05; // Allow for 10% deviation from expected count

      for (let i = 0; i < sampleSize; i++) {
        const rand = MNumber.random(min, max).getNumericValue();
        const bucket = rand;
        counts[bucket]++;
      }

      for (let i = 0; i < counts.length; i++) {
        const bucketCount = counts[i] - expectedCount;

        expect(bucketCount).toBeGreaterThan(-tolerance);
        expect(bucketCount).toBeLessThan(tolerance);
      }
    });

    it(`generates random 1 dec digit numbers evenly`, () => {
      const min = 0;
      const max = 1;
      const bucketsCount = 11;
      const sampleSize = 100000; // Number of random numbers to generate

      const counts = new Array(bucketsCount).fill(0);

      const expectedCount = sampleSize / counts.length;
      const tolerance = expectedCount * 0.05; // Allow for 10% deviation from expected count

      for (let i = 0; i < sampleSize; i++) {
        const rand = MNumber.random(min, max, 1).getNumericValue();
        const bucket = Math.round(rand * 10);
        counts[bucket]++;
      }

      for (let i = 0; i < counts.length; i++) {
        const bucketCount = counts[i] - expectedCount;

        expect(bucketCount).toBeGreaterThan(-tolerance);
        expect(bucketCount).toBeLessThan(tolerance);
      }
    });

    it(`generates random 2 dec digit numbers evenly`, () => {
      const min = 0;
      const max = 1;
      const bucketsCount = 101;
      const sampleSize = 200000; // Number of random numbers to generate

      const counts = new Array(bucketsCount).fill(0);

      const expectedCount = sampleSize / counts.length;
      const tolerance = expectedCount * 0.1; // Allow for 10% deviation from expected count

      for (let i = 0; i < sampleSize; i++) {
        const rand = MNumber.random(min, max, 2).getNumericValue();
        const bucket = Math.round(rand * 100);
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
