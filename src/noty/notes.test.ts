import { describe, expect, it } from "vitest";
import {
  DEFAULT_RANGES,
  generateNotes,
  isCorrectAnswer,
  NOTES,
  rangeLabel,
} from "./notes";

describe("note generation", () => {
  it("generates ten notes within each clef range", () => {
    for (const range of Object.values(DEFAULT_RANGES)) {
      const notes = generateNotes(range);
      expect(notes).toHaveLength(10);
      expect(
        notes.every((note) => note.id >= range.from && note.id <= range.to),
      ).toBe(true);
    }
  });

  it("includes both endpoints", () => {
    expect(generateNotes({ from: 7, to: 21 }, () => 0)[0]).toEqual(NOTES[7]);
    expect(generateNotes({ from: 7, to: 21 }, () => 0.999999)[0]).toEqual(
      NOTES[21],
    );
  });

  it("allows an interval containing just one note", () => {
    expect(
      generateNotes({ from: 21, to: 21 }).every((note) => note.id === 21),
    ).toBe(true);
  });

  it.each([0, 0.5, 0.999999])(
    "avoids adjacent repeats for all multi-note ranges with random value %s",
    (value) => {
      for (let from = 0; from < NOTES.length - 1; from += 1) {
        for (let to = from + 1; to < NOTES.length; to += 1) {
          const notes = generateNotes({ from, to }, () => value);
          expect(
            notes.every(
              (note, index) => index === 0 || note.id !== notes[index - 1].id,
            ),
          ).toBe(true);
        }
      }
    },
  );

  it("uses every pitch in an octave before repeating, including both endpoints", () => {
    const notes = generateNotes({ from: 21, to: 28 }, () => 0.999999);
    expect(
      notes
        .slice(0, 8)
        .map((note) => note.id)
        .sort((first, second) => first - second),
    ).toEqual(NOTES.slice(21, 29).map((note) => note.id));
  });

  it("maximizes distinct pitches and balances their usage for every range size", () => {
    for (let size = 1; size <= NOTES.length; size += 1) {
      const notes = generateNotes({ from: 0, to: size - 1 }, () => 0.5);
      const counts = NOTES.slice(0, size).map(
        (pitch) => notes.filter((note) => note.id === pitch.id).length,
      );
      expect(new Set(notes.map((note) => note.id)).size).toBe(
        Math.min(size, 10),
      );
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
    }
  });

  it("alternates two pitches without getting stuck at the boundary between rounds", () => {
    expect(
      generateNotes({ from: 21, to: 22 }, () => 0.999999).map(
        (note) => note.id,
      ),
    ).toEqual([22, 21, 22, 21, 22, 21, 22, 21, 22, 21]);
  });

  it("rejects reversed, fractional, and out-of-bounds ranges", () => {
    for (const range of [
      { from: 9, to: 8 },
      { from: -1, to: 8 },
      { from: 0, to: NOTES.length },
      { from: 1.5, to: 8 },
    ]) {
      expect(() => generateNotes(range)).toThrow(RangeError);
    }
  });

  it("maps Czech H to the engraving pitch B, not B flat", () => {
    expect(NOTES[27]).toMatchObject({ name: "H", key: "b/4", label: "h¹" });
  });

  it("labels the starting ranges in Czech octave notation", () => {
    expect(rangeLabel(DEFAULT_RANGES.treble)).toBe("c¹ – e²");
    expect(rangeLabel(DEFAULT_RANGES.bass)).toBe("c – c¹");
  });
});

describe("answer checking", () => {
  it("accepts either case and surrounding whitespace", () => {
    expect(isCorrectAnswer(" c ", NOTES[21])).toBe(true);
    expect(isCorrectAnswer("H", NOTES[27])).toBe(true);
    expect(isCorrectAnswer("h", NOTES[27])).toBe(true);
  });

  it("rejects a wrong pitch, an empty answer, and B in place of H", () => {
    expect(isCorrectAnswer("D", NOTES[21])).toBe(false);
    expect(isCorrectAnswer("", NOTES[21])).toBe(false);
    expect(isCorrectAnswer("B", NOTES[27])).toBe(false);
  });
});
