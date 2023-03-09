import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from "react";
import styled from "styled-components";
import { AGenerator } from "../../model/math/generators/examples/AGenerator";
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

export const ExamplesPreview: FunctionComponent<ExamplesPreviewPropsType> = (
  props
) => {
  props = {
    ...Defaults,
    ...props,
  };

  const exercisesState = useStateSlice("exercises", 350);
  const viewState = useStateSlice("view", 350);

  const columnsCount = viewState.layout.columns;

  const exercisesCount = exercisesState.count;
  const examplesPerExercise = exercisesState.examples.count;

  const exGen = useMemo(() => {
    const { plus, minus, times, divide, compare, fractPlus } =
      exercisesState.generators;
    const generators = [
      plus.active && new PlusExamplesGenerator(plus.config),
      minus.active && new MinusExamplesGenerator(minus.config),
      times.active && new TimesEG(times.config),
      divide.active && new DivideEG(divide.config),
      compare.active && new CompareEG(compare.config),
      fractPlus.active && new FractPlusEG(fractPlus.config),
    ].filter((v) => v) as AGenerator[];

    return new ExerciseGenerator(generators);
  }, [exercisesState]);

  const layoutGenerator = useMemo(
    () =>
      new PageLayoutGenerator(
        exercisesCount,
        columnsCount,
        examplesPerExercise
      ),
    [exercisesState, viewState, exGen]
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
