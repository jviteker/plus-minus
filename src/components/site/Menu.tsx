import { FunctionComponent, PropsWithChildren, useState } from "react";
import { FaCog } from "react-icons/fa";
import styled from "styled-components";
import { CompareEGConfigView } from "../../model/math/generators/examples/config-views/CompareEGConfigView";
import { DivideEGConfigView } from "../../model/math/generators/examples/config-views/DivideEGConfigView";
import { FractPlusEGConfigView } from "../../model/math/generators/examples/config-views/FractPlusEGConfigView";
import { MinusEGConfigView } from "../../model/math/generators/examples/config-views/MinusEGConfigView";
import { PlusEGConfigView } from "../../model/math/generators/examples/config-views/PlusEGConfigView";
import { TimesEGConfigView } from "../../model/math/generators/examples/config-views/TimesEGConfigView";
import { ViewSizePresetName } from "../../state/models/ViewModel";
import { useAppStore } from "../../state/utils/hooks/useAppStore";
import { useStateSlice } from "../../state/utils/hooks/useStateSlice";
import { Dialog } from "../lib/Dialog";
import { StyledSelect, StyledShortInput } from "../lib/StyledBits";

export type MenuPropsType = {} & PropsWithChildren;

const Defaults: Partial<MenuPropsType> = {};

const StyledSettingsIcon = styled(FaCog)`
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const StyledMenu = styled.div`
  @media screen {
    position: sticky;
    top: 0px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #fdfda7;
    margin-bottom: 2em;
    padding: 1em;
    display: flex;
    z-index: 2;

    .viewProps {
      display: flex;
      gap: 1em;
      flex-grow: 1;
    }

    .controls {
      display: flex;
      gap: 1em;
    }
  }

  @media print {
    display: none;
  }
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

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  return (
    <>
      {settingsDialogOpen && (
        <Dialog
          title={"Examples configuration"}
          onClose={() => {
            setSettingsDialogOpen(false);
          }}
        >
          <PlusEGConfigView
            config={exercisesState.generators.plus.config}
            onConfigChanged={(c) => {
              exercisesModel.setGeneratorConfig("plus", c);
            }}
            active={exercisesState.generators.plus.active}
            onActivityToggle={(active) => {
              exercisesModel.setGeneratorActive("plus", active);
            }}
          />
          <br />
          <MinusEGConfigView
            config={exercisesState.generators.minus.config}
            onConfigChanged={(c) => {
              exercisesModel.setGeneratorConfig("minus", c);
            }}
            active={exercisesState.generators.minus.active}
            onActivityToggle={(active) => {
              exercisesModel.setGeneratorActive("minus", active);
            }}
          />
          <br />
          <TimesEGConfigView
            config={exercisesState.generators.times.config}
            onConfigChanged={(c) => {
              exercisesModel.setGeneratorConfig("times", c);
            }}
            active={exercisesState.generators.times.active}
            onActivityToggle={(active) => {
              exercisesModel.setGeneratorActive("times", active);
            }}
          />
          <br />
          <DivideEGConfigView
            config={exercisesState.generators.divide.config}
            onConfigChanged={(c) => {
              exercisesModel.setGeneratorConfig("divide", c);
            }}
            active={exercisesState.generators.divide.active}
            onActivityToggle={(active) => {
              exercisesModel.setGeneratorActive("divide", active);
            }}
          />
          <br />
          <CompareEGConfigView
            config={exercisesState.generators.compare.config}
            onConfigChanged={(c) => {
              exercisesModel.setGeneratorConfig("compare", c);
            }}
            active={exercisesState.generators.compare.active}
            onActivityToggle={(active) => {
              exercisesModel.setGeneratorActive("compare", active);
            }}
          />
          <br />
          <FractPlusEGConfigView
            config={exercisesState.generators.fractPlus.config}
            onConfigChanged={(c) => {
              exercisesModel.setGeneratorConfig("fractPlus", c);
            }}
            active={exercisesState.generators.fractPlus.active}
            onActivityToggle={(active) => {
              exercisesModel.setGeneratorActive("fractPlus", active);
            }}
          />
        </Dialog>
      )}
      <StyledMenu>
        <div className="viewProps">
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
        </div>
        <div className="controls">
          <span
            onClick={() => {
              setSettingsDialogOpen(true);
            }}
            title={"Exercises settings"}
          >
            <StyledSettingsIcon size={"1.4em"} />
          </span>
        </div>
      </StyledMenu>
    </>
  );
};
