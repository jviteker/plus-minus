import React, { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";
import { ViewSizePresetName } from "../../state/models/ViewModel";
import { useAppStore } from "../../state/utils/hooks/useAppStore";
import { useStateSlice } from "../../state/utils/hooks/useStateSlice";

export type MenuPropsType = {} & PropsWithChildren;

const Defaults: Partial<MenuPropsType> = {};

const StyledMenu = styled.div`
  @media screen {
    background-color: white;
    margin-bottom: 2em;
    padding: 1em;
    display: flex;
    gap: 1em;
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

const StyledSelect = styled.select`
  border: none;
  border-bottom: 1px solid gray;
`;

export const Menu: FunctionComponent<MenuPropsType> = (props) => {
  props = {
    ...Defaults,
    ...props,
  };

  const store = useAppStore();
  const exercisesModel = store.getExercisesModel();
  const viewModel = store.getViewModel();

  const exercisesState = useStateSlice("exercises");
  const viewState = useStateSlice("view");

  return (
    <StyledMenu>
      {/* <div> */}
      <label>
        Exercises count:
        <StyledShortInput
          type={"number"}
          value={exercisesState.count}
          min={1}
          max={100}
          onChange={(e) => {
            exercisesModel.setExercisesCount(Number(e.currentTarget.value));
          }}
        />
      </label>
      <label>
        Examples per exercise:
        <StyledShortInput
          type={"number"}
          value={exercisesState.examples.count}
          min={1}
          max={36}
          onChange={(e) => {
            exercisesModel.setExamplesCount(Number(e.currentTarget.value));
          }}
        />
      </label>
      <label>
        Columns:
        <StyledShortInput
          type={"number"}
          value={viewState.layout.columns}
          min={1}
          max={3}
          onChange={(e) => {
            viewModel.setColumnsCount(Number(e.currentTarget.value));
          }}
        />
      </label>

      <label>
        Font size:
        <StyledSelect
          value={viewState.presetName}
          onChange={(e) => {
            viewModel.setViewSizePreset(
              String(e.currentTarget.value) as ViewSizePresetName
            );
          }}
        >
          {viewModel.getViewSizePresetNames().map((presetName) => {
            return (
              <option
                key={presetName}
                value={presetName}
              >
                {presetName}
              </option>
            );
          })}
        </StyledSelect>
      </label>

      <label
        title={
          "Adjusts the orientation of even pages to align the cut lines for double-sided printing."
        }
      >
        Double sided print:
        <StyledShortInput
          type={"checkbox"}
          checked={viewState.layout.doubleSidedPrint}
          onChange={(e) => {
            viewModel.setDoubleSidedPrint(e.currentTarget.checked);
          }}
        />
      </label>
      {/* </div> */}
    </StyledMenu>
  );
};
