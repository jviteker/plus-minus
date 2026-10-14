import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Eraser,
  Eye,
  EyeOff,
  Music2,
  Printer,
  RotateCw,
} from "lucide-react";
import { NoteStaff } from "./NoteStaff";
import {
  CLEF_OPTIONS,
  DEFAULT_RANGES,
  generateNotes,
  isCorrectAnswer,
  rangeLabel,
} from "./notes";
import type { Clef, Note, NoteRange, Ranges } from "./notes";
import "./index.css";
import "./App.css";

type Exercise = { number: number; ranges: Ranges; notes: Record<Clef, Note[]> };
const clefs: Clef[] = ["treble", "bass"];
const clefNames: Record<Clef, string> = {
  treble: "Houslový klíč",
  bass: "Basový klíč",
};

function makeExercise(ranges: Ranges, number: number): Exercise {
  return {
    number,
    ranges,
    notes: {
      treble: generateNotes(ranges.treble),
      bass: generateNotes(ranges.bass),
    },
  };
}

function emptyAnswers(): Record<Clef, string[]> {
  return {
    treble: Array<string>(10).fill(""),
    bass: Array<string>(10).fill(""),
  };
}

function RangeControls({
  clef,
  range,
  onChange,
}: {
  clef: Clef;
  range: NoteRange;
  onChange: (range: NoteRange) => void;
}) {
  return (
    <fieldset className="range-group">
      <legend>{clefNames[clef]}</legend>
      <div className="range-selects">
        <label className="select-field">
          <span>Od</span>
          <select
            aria-label={`${clefNames[clef]} od`}
            value={range.from}
            onChange={(event) => {
              const from = Number(event.target.value);
              onChange({ from, to: Math.max(from, range.to) });
            }}
          >
            {CLEF_OPTIONS[clef].map((note) => (
              <option
                key={note.id}
                value={note.id}
              >
                {note.label} · {note.name}
                {note.octave}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            aria-hidden="true"
          />
        </label>
        <ArrowRight
          size={15}
          className="range-arrow"
          aria-hidden="true"
        />
        <label className="select-field">
          <span>Do</span>
          <select
            aria-label={`${clefNames[clef]} do`}
            value={range.to}
            onChange={(event) => {
              const to = Number(event.target.value);
              onChange({ from: Math.min(range.from, to), to });
            }}
          >
            {CLEF_OPTIONS[clef].map((note) => (
              <option
                key={note.id}
                value={note.id}
              >
                {note.label} · {note.name}
                {note.octave}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            aria-hidden="true"
          />
        </label>
      </div>
    </fieldset>
  );
}

function App() {
  const [ranges, setRanges] = useState<Ranges>(DEFAULT_RANGES);
  const [exercise, setExercise] = useState(() =>
    makeExercise(DEFAULT_RANGES, 1),
  );
  const [answers, setAnswers] = useState(emptyAnswers);
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const filled = clefs
    .flatMap((clef) => answers[clef])
    .filter((answer) => answer.trim()).length;
  const correct = clefs.reduce(
    (sum, clef) =>
      sum +
      exercise.notes[clef].filter((note, index) =>
        isCorrectAnswer(answers[clef][index], note),
      ).length,
    0,
  );

  function resetAnswers() {
    setAnswers(emptyAnswers());
    setChecked(false);
    setRevealed(false);
  }

  function newExercise() {
    setExercise(makeExercise(ranges, exercise.number + 1));
    resetAnswers();
  }

  return (
    <div className="noty-page app-shell">
      <main>
        <div className="page-heading">
          <div>
            <h1>Notový diktát</h1>
          </div>
          <button
            className="button button-secondary print-button"
            aria-label="Vytisknout"
            onClick={() => window.print()}
          >
            <Printer size={17} />
            <span>Vytisknout</span>
          </button>
        </div>

        <section
          className="settings"
          aria-label="Nastavení rozsahu not"
        >
          <div className="settings-title">
            <h2>Rozsah not</h2>
            <span>10 not v každém klíči</span>
          </div>
          <div className="settings-controls">
            {clefs.map((clef) => (
              <RangeControls
                key={clef}
                clef={clef}
                range={ranges[clef]}
                onChange={(range) =>
                  setRanges((current) => ({ ...current, [clef]: range }))
                }
              />
            ))}
            <button
              className="button button-primary generate-button"
              onClick={newExercise}
            >
              <RotateCw size={17} />
              <span>Nové zadání</span>
            </button>
          </div>
        </section>

        <article
          className="worksheet"
          aria-label="Pracovní list"
        >
          <header className="worksheet-header">
            <div className="sheet-label">
              <span className="sheet-dot" />
              <h2>
                Pracovní list{" "}
                <span>{String(exercise.number).padStart(2, "0")}</span>
              </h2>
            </div>
            <span className="sheet-meta">
              20 not <span>·</span> bez předznamenání
            </span>
            <div className="print-identity">
              <span>
                Jméno: <span className="identity-line" />
              </span>
              <span>
                Datum: <span className="identity-line date-line" />
              </span>
            </div>
          </header>

          {clefs.map((clef, index) => (
            <section
              className={`clef-section clef-${clef}`}
              key={clef}
              aria-label={clefNames[clef]}
            >
              <div className="clef-heading">
                <div className="clef-title">
                  <span className="section-number">0{index + 1}</span>
                  <h3>{clefNames[clef]}</h3>
                </div>
                <span className="range-label">
                  {rangeLabel(exercise.ranges[clef])}
                </span>
              </div>
              <NoteStaff
                clef={clef}
                notes={exercise.notes[clef]}
                answers={answers[clef]}
                checked={checked}
                revealed={revealed}
                onAnswer={(position, answer) => {
                  setAnswers((current) => ({
                    ...current,
                    [clef]: current[clef].map((value, index) =>
                      index === position ? answer : value,
                    ),
                  }));
                  setChecked(false);
                }}
              />
            </section>
          ))}

          <footer className="worksheet-footer">
            <div
              className="completion"
              role="status"
              aria-live="polite"
            >
              <span className="completion-text">
                {checked ? (
                  <>
                    <strong>{correct} / 20</strong> správně
                    {correct === 20 ? ". Bez chyby!" : ""}
                  </>
                ) : (
                  <>
                    <strong>{filled} / 20</strong> vyplněno
                  </>
                )}
              </span>
              <div
                className={`progress-track${checked ? " is-checked" : ""}`}
                aria-hidden="true"
              >
                <span
                  style={{
                    width: `${((checked ? correct : filled) / 20) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="worksheet-actions">
              <div className="tooltip-wrap">
                <button
                  className="icon-button"
                  aria-label="Vymazat odpovědi"
                  disabled={filled === 0 && !checked && !revealed}
                  onClick={resetAnswers}
                >
                  <Eraser size={18} />
                </button>
                <span
                  className="tooltip"
                  role="tooltip"
                >
                  Vymazat odpovědi
                </span>
              </div>
              <div className="tooltip-wrap">
                <button
                  className={`icon-button${revealed ? " is-active" : ""}`}
                  aria-label={revealed ? "Skrýt řešení" : "Zobrazit řešení"}
                  aria-pressed={revealed}
                  onClick={() => setRevealed((current) => !current)}
                >
                  {revealed ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <span
                  className="tooltip"
                  role="tooltip"
                >
                  {revealed ? "Skrýt řešení" : "Zobrazit řešení"}
                </span>
              </div>
              <button
                className="button button-primary check-button"
                disabled={filled === 0}
                onClick={() => setChecked(true)}
              >
                <Check size={17} />
                <span>Zkontrolovat</span>
              </button>
            </div>
          </footer>
          <div className="print-footer">
            Notový diktát · České názvosloví C, D, E, F, G, A, H
          </div>
        </article>

        <footer className="page-footer">
          <span>
            České názvosloví <span className="footer-separator">/</span> C D E F
            G A H
          </span>
          {/* <span className="footer-signature">
            <Music2 size={13} /> Po jedné notě.
          </span> */}
        </footer>
      </main>
    </div>
  );
}

export default App;
