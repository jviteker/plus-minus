import "katex/dist/katex.min.css";
import { Exercise } from "./components/Exercise";
import {
  Columns,
  PageContent,
  VerticalCut,
  XPage,
} from "./components/layout/Layout";
import { CompareEG } from "./model/generators/examples/numbers/CompareEG";
import { FractPlusEG } from "./model/generators/examples/FractPlusEG";
import { ExerciseGenerator } from "./model/generators/exercises/ExerciseGenerator";
import { MinusExamplesGenerator } from "./model/generators/examples/numbers/MinusExamplesGenerator";
import { PlusExamplesGenerator } from "./model/generators/examples/numbers/PlusExamplesGenerator";
import { TimesEG } from "./model/generators/examples/numbers/TimesEG";
import { DivideEG } from "./model/generators/examples/numbers/DivideEG";

const exGen = new ExerciseGenerator([
  new PlusExamplesGenerator(),
  new MinusExamplesGenerator(),
  new CompareEG(),
  new FractPlusEG(),
  new TimesEG(),
  new DivideEG(),
]);

const count = 10;

function App() {
  return (
    <>
      <XPage>
        <PageContent>
          <VerticalCut left="33.33" />
          <VerticalCut left="66.66" />
          <Columns>
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
          </Columns>
          <Columns>
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
          </Columns>
          <Columns>
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
          </Columns>
        </PageContent>
      </XPage>
      <XPage className={"even"}>
        <PageContent className={"even"}>
          <VerticalCut left="33.33" />
          <VerticalCut left="66.66" />
          <Columns>
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
          </Columns>
          <Columns>
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
          </Columns>
          <Columns>
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
            <Exercise examples={exGen.generate(count)} />
          </Columns>
        </PageContent>
      </XPage>
    </>
  );
}

export default App;
