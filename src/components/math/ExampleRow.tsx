import { FunctionComponent } from "react";
import { InlineMath } from "react-katex";
import { Example } from "../../model/math/primitives/Example";
import { LeftCell, RightCell } from "./Exercise";

type ExampleRowPropsType = {
  example: Example;
};

export const ExampleRow: FunctionComponent<ExampleRowPropsType> = (props) => {
  return (
    <tr>
      <LeftCell>
        <InlineMath math={props.example.getText().toTex()} />
      </LeftCell>
      <RightCell>
        <InlineMath math={props.example.getResult().toTex()} />
      </RightCell>
    </tr>
  );
};
