import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AGenerator } from "../../model/math/generators/examples/AGenerator";
import { FractPlusEG } from "../../model/math/generators/examples/FractPlusEG";
import { CompareEG } from "../../model/math/generators/examples/numbers/CompareEG";
import { DivideEG } from "../../model/math/generators/examples/numbers/DivideEG";
import { MinusEG } from "../../model/math/generators/examples/numbers/MinusEG";
import { PlusEG } from "../../model/math/generators/examples/numbers/PlusEG";
import { TimesEG } from "../../model/math/generators/examples/numbers/TimesEG";
import { ExerciseGenerator } from "../../model/math/generators/exercises/ExerciseGenerator";
import { useStateSlice } from "../../state/utils/hooks/useStateSlice";
import { StyledError } from "../lib/StyledBits";
import { Exercise } from "../math/Exercise";
import { Page, PageContent } from "../math/layout/Layout";
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

  const { t } = useTranslation();

  const columnsCount = viewState.layout.columns;

  const exercisesCount = exercisesState.count;
  const examplesPerExercise = exercisesState.examples.count;

  const exGen = useMemo(() => {
    const { plus, minus, times, divide, compare, fractPlus } =
      exercisesState.generators;
    const generators = [
      plus.active && new PlusEG(plus.config),
      minus.active && new MinusEG(minus.config),
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
    try {
      layoutGenerator.addExercise(
        <Exercise
          key={i}
          examples={exGen.generate(examplesPerExercise)}
        />
      );
    } catch (e) {
      if (e === "new_page_overfilled") {
        return (
          <StyledPreview>
            <Page>
              <PageContent>
                <StyledError>{t("errors.newPageOverfilled")}</StyledError>
              </PageContent>
            </Page>
          </StyledPreview>
        );
      }
    }
  }

  return <StyledPreview>{layoutGenerator.asReactMarkup()}</StyledPreview>;
};
