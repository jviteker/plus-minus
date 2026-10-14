import { lazy, Suspense } from "react";
import "katex/dist/katex.min.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ExamplesPreview } from "./components/site/ExamplesPreview";
import { Footer } from "./components/site/Footer";
import { LandingPage } from "./components/site/LandingPage";
import { Menu } from "./components/site/Menu";

const NotyApp = lazy(() => import("./noty/App"));

function MathExercises() {
  return (
    <>
      <Menu />
      <ExamplesPreview />
      <Footer />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/math"
          element={<MathExercises />}
        />
        <Route
          path="/music"
          element={
            <Suspense fallback={null}>
              <NotyApp />
            </Suspense>
          }
        />
        <Route
          path="/noty"
          element={<Navigate to="/music" replace />}
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
