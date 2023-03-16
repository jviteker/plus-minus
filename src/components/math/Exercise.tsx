import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Example } from "../../model/math/primitives/Example";
import { Utils } from "../../model/utils/Utils";
import { useAppStore } from "../../state/utils/hooks/useAppStore";
import { ExampleRow } from "./ExampleRow";
import { VerticalCut } from "./layout/Layout";

type ExercisePropsType = {
  examples: Example[];
  title?: string;
  selfEvaluation?: boolean;
};

type FontSizeProps = {
  lineHeigh: number;
  fontSize: number;
};

const Container = styled.div`
  position: relative;
  margin: 0 10px 0 10px;
  width: 100%;
`;

const ExTable = styled.table<FontSizeProps>`
  width: 100%;
  border-collapse: collapse;

  thead {
    th {
      font-size: larger;
      padding-bottom: 10px;
      font-style: italic;
    }
  }

  tbody {
    font-size: ${(p) => p.fontSize}px;
    line-height: ${(p) => p.lineHeigh}px;
  }
`;

export const LeftCell = styled.td`
  width: 70%;
  text-align: left;
  font-weight: normal;
`;

export const RightCell = styled.td`
  width: 30%;
  text-align: left;
  font-weight: normal;
`;

export const Exercise: FunctionComponent<ExercisePropsType> = (props) => {
  const { t } = useTranslation();

  const id = Utils.randomString();
  const title = props.title
    ? `${props.title} - ${id}`
    : `${t("payload.ex")} ${id}`;

  const store = useAppStore();
  const { fontSize, lineHeight } = store.getState()["view"];

  return (
    <Container className={"exercise container"}>
      <ExTable
        fontSize={fontSize}
        lineHeigh={lineHeight}
      >
        <thead>
          <tr>
            <LeftCell as={"th"}>{title}</LeftCell>
            <RightCell as={"th"}>{id}</RightCell>
          </tr>
        </thead>
        <tbody>
          {props.examples.map((e, i) => {
            return (
              <ExampleRow
                example={e}
                key={i}
              />
            );
          })}
        </tbody>
      </ExTable>
      <VerticalCut left="68"></VerticalCut>
    </Container>
  );
};
