import { ArrowUpRight, Music2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const languages = [
  { code: "cz", label: "Česky" },
  { code: "en", label: "English" },
] as const;

export function LandingPage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage?.startsWith("en") ? "en" : "cz";

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-brand">
          <span
            className="brand-mark"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
          <span>{t("landing.brand")}</span>
        </div>
        <div
          className="language-switch"
          role="group"
          aria-label={t("landing.language")}
        >
          {languages.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              aria-pressed={currentLanguage === code}
              className={currentLanguage === code ? "is-active" : ""}
              onClick={() => void i18n.changeLanguage(code)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-intro">
          <p className="landing-kicker">
            <span aria-hidden="true" />
            {t("landing.kicker")}
          </p>
          <h1>{t("landing.title")}</h1>
          <p className="landing-description">{t("landing.description")}</p>
        </section>

        <section
          className="subject-grid"
          aria-label={t("landing.subjects")}
        >
          <Link
            to="/math"
            className="subject-card math-card"
          >
            <div
              className="subject-art math-art"
              aria-hidden="true"
            >
              <span className="art-label">{t("landing.math.artLabel")}</span>
              <span className="math-side-index">01</span>
              <div className="math-sheet">
                <span className="sheet-overline">EXERCISE 01</span>
                <span className="math-equation">
                  48 <b>+</b> 17
                </span>
                <span className="equation-rule" />
                <span className="math-answer">= 65</span>
              </div>
              <span className="math-margin-mark">+</span>
            </div>
            <div className="subject-card-body">
              <div className="subject-kicker">
                <span className="subject-dot" />
                {t("landing.math.kicker")}
              </div>
              <div className="subject-title-row">
                <h2>{t("landing.math.title")}</h2>
                <span className="subject-arrow" aria-hidden="true">
                  <ArrowUpRight size={21} strokeWidth={1.7} />
                </span>
              </div>
              <p>{t("landing.math.description")}</p>
              <span className="subject-action">
                {t("landing.math.action")}
              </span>
            </div>
          </Link>

          <Link
            to="/music"
            className="subject-card music-card"
          >
            <div
              className="subject-art music-art"
              aria-hidden="true"
            >
              <span className="art-label">{t("landing.music.artLabel")}</span>
              <span className="music-side-index">02</span>
              <div className="music-staff">
                <span className="music-staff-rule" />
                <span className="music-staff-rule" />
                <span className="music-staff-rule" />
                <span className="music-staff-rule" />
                <span className="music-staff-rule" />
                <Music2 className="music-clef" size={76} strokeWidth={1.15} />
                <span className="staff-note note-one" />
                <span className="staff-note note-two" />
                <span className="staff-note note-three" />
              </div>
              <span className="music-caption">C · E · G · H</span>
            </div>
            <div className="subject-card-body">
              <div className="subject-kicker">
                <span className="subject-dot" />
                {t("landing.music.kicker")}
              </div>
              <div className="subject-title-row">
                <h2>{t("landing.music.title")}</h2>
                <span className="subject-arrow" aria-hidden="true">
                  <ArrowUpRight size={21} strokeWidth={1.7} />
                </span>
              </div>
              <p>{t("landing.music.description")}</p>
              <span className="subject-action">
                {t("landing.music.action")}
              </span>
            </div>
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <span>PLUS-MINUS.CZ</span>
        <span>{currentLanguage === "en" ? "LEARN BY DOING" : "UČENÍ PRAXÍ"}</span>
      </footer>
    </div>
  );
}