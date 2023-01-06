import "katex/dist/katex.min.css";
import { ExamplesPreview } from "./components/site/ExamplesPreview";
import { Menu } from "./components/site/Menu";

function App() {
  return (
    <>
      <Menu></Menu>
      <ExamplesPreview></ExamplesPreview>
    </>
  );
}

export default App;
