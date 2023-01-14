import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from "react";
import styled from "styled-components";
import { FractPlusEG } from "../../model/math/generators/examples/FractPlusEG";
import { CompareEG } from "../../model/math/generators/examples/numbers/CompareEG";
import { DivideEG } from "../../model/math/generators/examples/numbers/DivideEG";
import { MinusExamplesGenerator } from "../../model/math/generators/examples/numbers/MinusExamplesGenerator";
import { PlusExamplesGenerator } from "../../model/math/generators/examples/numbers/PlusExamplesGenerator";
import { TimesEG } from "../../model/math/generators/examples/numbers/TimesEG";
import { ExerciseGenerator } from "../../model/math/generators/exercises/ExerciseGenerator";
import { useStateSlice } from "../../state/utils/hooks/useStateSlice";
import { Exercise } from "../math/Exercise";
import { PageLayoutGenerator } from "./PageLayoutGenerator";

export type ExamplesPreviewPropsType = {} & PropsWithChildren;

const Defaults: Partial<ExamplesPreviewPropsType> = {};

const StyledPreview = styled.div`
  @media screen {
    padding: 1em;
  }

  @media print {
  }
`;

const exGen = new ExerciseGenerator([
  new PlusExamplesGenerator(),
  new MinusExamplesGenerator(),
  new CompareEG(),
  new FractPlusEG(),
  new TimesEG(),
  new DivideEG(),
]);

export const ExamplesPreview: FunctionComponent<ExamplesPreviewPropsType> = (
  props
) => {
  props = {
    ...Defaults,
    ...props,
  };

  const exercisesState = useStateSlice("exercises");
  const viewState = useStateSlice("view");

  const columnsCount = viewState.layout.columns;

  const exercisesCount = exercisesState.count;
  const examplesPerExercise = exercisesState.examples.count;

  const layoutGenerator = useMemo(
    () =>
      new PageLayoutGenerator(
        exercisesCount,
        columnsCount,
        examplesPerExercise
      ),
    [exercisesCount, columnsCount, examplesPerExercise]
  );

  for (let i = 0; i < exercisesCount; i++) {
    layoutGenerator.addExercise(
      <Exercise
        key={i}
        examples={exGen.generate(examplesPerExercise)}
      />
    );
  }

  const pages: ReactElement[] = layoutGenerator.asReactMarkup();

  return <StyledPreview>{layoutGenerator.asReactMarkup()}</StyledPreview>;
};
