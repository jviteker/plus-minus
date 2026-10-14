export type Clef = "treble" | "bass";
export type NoteName = "C" | "D" | "E" | "F" | "G" | "A" | "H";

export type Note = {
  id: number;
  name: NoteName;
  octave: number;
  key: string;
  label: string;
};

export type NoteRange = { from: number; to: number };
export type Ranges = Record<Clef, NoteRange>;

const names: NoteName[] = ["C", "D", "E", "F", "G", "A", "H"];
const engravingNames = ["c", "d", "e", "f", "g", "a", "b"];
const octaveMarks = ["", "", "", "", "¹", "²", "³"];

export const NOTES: Note[] = Array.from({ length: 42 }, (_, index) => {
  const octave = Math.floor(index / 7) + 1;
  const degree = index % 7;
  const name = names[degree];
  const label = octave <= 2 ? name : name.toLowerCase();

  return {
    id: index,
    name,
    octave,
    key: `${engravingNames[degree]}/${octave}`,
    label: octave === 1 ? `${label}₁` : `${label}${octaveMarks[octave]}`,
  };
});

export const DEFAULT_RANGES: Ranges = {
  treble: { from: 21, to: 30 },
  bass: { from: 14, to: 21 },
};

export const CLEF_OPTIONS: Record<Clef, Note[]> = {
  treble: NOTES.filter((note) => note.octave >= 3),
  bass: NOTES.filter((note) => note.octave <= 4),
};

export function generateNotes(
  range: NoteRange,
  random: () => number = Math.random,
): Note[] {
  if (
    !Number.isInteger(range.from) ||
    !Number.isInteger(range.to) ||
    range.from < 0 ||
    range.to >= NOTES.length ||
    range.from > range.to
  ) {
    throw new RangeError("Invalid note range");
  }

  const usage = NOTES.slice(range.from, range.to + 1).map((note) => ({
    note,
    count: 0,
  }));
  let previousId: number | undefined;

  return Array.from({ length: 10 }, () => {
    const available = usage.filter(
      ({ note }) => usage.length === 1 || note.id !== previousId,
    );
    const minimumCount = Math.min(...available.map(({ count }) => count));
    const candidates = available.filter(({ count }) => count === minimumCount);
    const selected = candidates[Math.floor(random() * candidates.length)];
    selected.count += 1;
    previousId = selected.note.id;
    return selected.note;
  });
}

export function isCorrectAnswer(answer: string, note: Note): boolean {
  return answer.trim().toLocaleUpperCase("cs-CZ") === note.name;
}

export function rangeLabel(range: NoteRange): string {
  return `${NOTES[range.from].label} – ${NOTES[range.to].label}`;
}
