import "katex/dist/katex.min.css";
import { ExamplesPreview } from "./components/site/ExamplesPreview";
import { Footer } from "./components/site/Footer";
import { Menu } from "./components/site/Menu";

function App() {
  return (
    <>
      <Menu />
      <ExamplesPreview />
      <Footer />
    </>
  );
}

export default App;
