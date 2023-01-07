import React, { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";
import { useAppState } from "../../state/utils/hooks/useAppState";

export type MenuPropsType = {} & PropsWithChildren;

const Defaults: Partial<MenuPropsType> = {};

const StyledMenu = styled.div`
  @media screen {
    background-color: white;
    margin-bottom: 2em;
    padding: 1em;
  }

  @media print {
    display: none;
  }
`;

const StyledShortInput = styled.input`
  width: 3em;
  border: none;
  border-bottom: 1px solid gray;
  text-align: right;
`;

export const Menu: FunctionComponent<MenuPropsType> = (props) => {
  props = {
    ...Defaults,
    ...props,
  };

  const [state, store] = useAppState();

  return (
    <StyledMenu>
      <div>
        <label>
          Exercises count:
          <StyledShortInput
            type={"number"}
            value={state.exercises.count}
            min={1}
            max={100}
            onChange={(e) => {
              store.setExercisesCount(Number(e.currentTarget.value));
            }}
          />
        </label>
        <label>
          Examples per exercise:
          <StyledShortInput
            type={"number"}
            value={state.exercises.examples.count}
            min={1}
            max={36}
            onChange={(e) => {
              store.setExamplesCount(Number(e.currentTarget.value));
            }}
          />
        </label>
        <label>
          Columns:
          <StyledShortInput
            type={"number"}
            value={state.layout.columns}
            min={1}
            max={3}
            onChange={(e) => {
              store.setColumnsCount(Number(e.currentTarget.value));
            }}
          />
        </label>
      </div>
    </StyledMenu>
  );
};
