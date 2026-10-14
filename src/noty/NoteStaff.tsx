import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";
import { isCorrectAnswer } from "./notes";
import type { Clef, Note } from "./notes";

type StaffProps = {
  clef: Clef;
  notes: Note[];
  answers: string[];
  checked: boolean;
  revealed: boolean;
  onAnswer: (index: number, answer: string) => void;
};

type LineProps = StaffProps & { offset: number; variant: string };

function focusNextAnswer(currentInput: HTMLInputElement) {
  const inputs = Array.from(
    document.querySelectorAll<HTMLInputElement>(".note-answer-input"),
  ).filter((input) => input.getClientRects().length > 0);
  inputs[inputs.indexOf(currentInput) + 1]?.focus();
}

function StaffLine({
  clef,
  notes,
  answers,
  checked,
  revealed,
  onAnswer,
  offset,
  variant,
}: LineProps) {
  const notationRef = useRef<HTMLDivElement>(null);
  const answersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const container = notationRef.current;
    const answerStrip = answersRef.current;
    if (!container || !answerStrip) return;

    void document.fonts.ready.then(() => {
      if (cancelled) return;
      container.replaceChildren();
      const width = notes.length === 10 ? 1100 : 570;
      const height = 150;
      const renderer = new Renderer(container, Renderer.Backends.SVG);
      renderer.resize(width, height);
      const context = renderer.getContext();
      context.setFillStyle("#24372e");
      context.setStrokeStyle("#24372e");
      const stave = new Stave(10, 20, width - 20);
      stave.addClef(clef).setContext(context).draw();

      const staveNotes = notes.map(
        (note) =>
          new StaveNote({
            clef,
            keys: [note.key],
            duration: "q",
            autoStem: true,
          }),
      );
      const voice = new Voice({ numBeats: notes.length, beatValue: 4 });
      voice.addTickables(staveNotes);
      new Formatter().joinVoices([voice]).formatToStave([voice], stave);
      voice.draw(context, stave);
      const svg = container.querySelector("svg");
      if (svg) {
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("aria-hidden", "true");
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.style.width = "100%";
        svg.style.height = "auto";
      }

      const slots = answerStrip.querySelectorAll<HTMLElement>(".answer-slot");
      staveNotes.forEach((note, index) => {
        const center = (note.getNoteHeadBeginX() + note.getNoteHeadEndX()) / 2;
        slots[index].style.left = `${(center / width) * 100}%`;
      });
    });

    return () => {
      cancelled = true;
      container.replaceChildren();
    };
  }, [clef, notes]);

  return (
    <div className="staff-line">
      <div
        className="notation"
        ref={notationRef}
      />
      <div
        className="answer-strip"
        ref={answersRef}
      >
        {notes.map((note, index) => {
          const position = offset + index;
          const answer = answers[position];
          const correct = checked && isCorrectAnswer(answer, note);
          const incorrect = checked && !correct;
          const fieldId = `${clef}-${variant}-${position}`;
          return (
            <div
              className={`answer-slot${correct ? " is-correct" : ""}${incorrect ? " is-incorrect" : ""}`}
              key={position}
              style={{ left: `${12 + index * (84 / notes.length)}%` }}
            >
              <label
                className="note-number"
                htmlFor={fieldId}
              >
                {position + 1}
              </label>
              <div className="answer-field">
                <input
                  id={fieldId}
                  aria-label={`${clef === "treble" ? "Houslový" : "Basový"} klíč, nota ${position + 1}`}
                  aria-invalid={incorrect || undefined}
                  aria-describedby={
                    checked || revealed ? `${fieldId}-feedback` : undefined
                  }
                  value={answer}
                  placeholder="?"
                  maxLength={3}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  onChange={(event) => {
                    const value = event.target.value;
                    onAnswer(position, value);
                    if (
                      answer.trim() === "" &&
                      /^[CDEFGAH]$/i.test(value.trim())
                    ) {
                      focusNextAnswer(event.currentTarget);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    focusNextAnswer(event.currentTarget);
                  }}
                  className="note-answer-input"
                />
                {checked && (
                  <span
                    className="answer-status"
                    aria-hidden="true"
                  >
                    {correct ? <Check size={12} /> : <X size={12} />}
                  </span>
                )}
              </div>
              <div
                className="answer-feedback"
                id={`${fieldId}-feedback`}
              >
                {revealed ? (
                  <span className="solution">{note.name}</span>
                ) : (
                  <span className="sr-only">
                    {checked
                      ? correct
                        ? "Správně"
                        : answer.trim()
                          ? "Nesprávně"
                          : "Nevyplněno"
                      : ""}
                  </span>
                )}
              </div>
              <div className="print-answer" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function NoteStaff(props: StaffProps) {
  return (
    <>
      <div className="staff-desktop">
        <StaffLine
          {...props}
          offset={0}
          variant="desktop"
        />
      </div>
      <div className="staff-mobile">
        <StaffLine
          {...props}
          notes={props.notes.slice(0, 5)}
          offset={0}
          variant="mobile-first"
        />
        <StaffLine
          {...props}
          notes={props.notes.slice(5)}
          offset={5}
          variant="mobile-second"
        />
      </div>
    </>
  );
}
