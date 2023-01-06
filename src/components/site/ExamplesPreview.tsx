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
import { useAppState } from "../../state/utils/hooks/useAppState";
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

  const [state, store] = useAppState();

  const exercisesCount = state.exercises.count;
  const columnsCount = state.layout.columns;
  const examplesPerExercise = state.exercises.examples.count;

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
