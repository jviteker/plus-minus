import { FunctionComponent, PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCog, FaFlag, FaPrint } from "react-icons/fa";
import styled from "styled-components";
import { CompareEGConfigView } from "../../model/math/generators/examples/config-views/CompareEGConfigView";
import { DivideEGConfigView } from "../../model/math/generators/examples/config-views/DivideEGConfigView";
import { FractPlusEGConfigView } from "../../model/math/generators/examples/config-views/FractPlusEGConfigView";
import { MinusEGConfigView } from "../../model/math/generators/examples/config-views/MinusEGConfigView";
import { PlusEGConfigView } from "../../model/math/generators/examples/config-views/PlusEGConfigView";
import { TimesEGConfigView } from "../../model/math/generators/examples/config-views/TimesEGConfigView";
import { FractPlusEG } from "../../model/math/generators/examples/FractPlusEG";
import { CompareEG } from "../../model/math/generators/examples/numbers/CompareEG";
import { DivideEG } from "../../model/math/generators/examples/numbers/DivideEG";
import { MinusEG } from "../../model/math/generators/examples/numbers/MinusEG";
import { PlusEG } from "../../model/math/generators/examples/numbers/PlusEG";
import { TimesEG } from "../../model/math/generators/examples/numbers/TimesEG";
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

const StyledLanguageIcon = styled(FaFlag)`
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const StyledPrintIcon = styled(FaPrint)`
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const StyledMenu = styled.div`
  @media screen {
    /* min-width: 215mm; */
    position: sticky;
    top: 0px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #fdfda7;
    margin-bottom: 1em;
    padding: 0.8em;
    display: flex;
    align-items: flex-start;

    z-index: 2;

    .viewProps {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5em 1em;

      label {
        width: 100%;

        @media (min-width: 210mm) {
          width: auto;
        }
      }
      flex-grow: 1;
    }

    .controls {
      display: flex;
      gap: 1em;
    }

    /* @media (min-width: 210mm) {
      color: red;
    } */
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

  const { t, i18n } = useTranslation();

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
          title={`${t("settings.dialogTitle")}`}
          onClose={() => {
            setSettingsDialogOpen(false);
          }}
        >
          <PlusEGConfigView
            config={exercisesState.generators.plus.config}
            onConfigChanged={(c) => {
              PlusEG.sanitizeConfig(c);
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
              MinusEG.sanitizeConfig(c);
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
              TimesEG.sanitizeConfig(c);
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
              DivideEG.sanitizeConfig(c);
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
              CompareEG.sanitizeConfig(c);
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
              FractPlusEG.sanitizeConfig(c);
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
            {t("menu.options.exCount")}:
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
            {t("menu.options.examplesPerEx")}:
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
            {t("menu.options.columns")}:
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
            {t("menu.options.fontSize.main")}:
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
                    {/* @ts-ignore */}
                    {t(`menu.options.fontSize.${presetName}`)}
                  </option>
                );
              })}
            </StyledSelect>
          </label>

          <label title={t("menu.options.doubleSidedPrint.title")}>
            {t("menu.options.doubleSidedPrint.main")}:
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
          <StyledPrintIcon
            size={"1.4em"}
            onClick={() => {
              window.print();
            }}
            title={t("menu.icons.print")}
          />
          <StyledSettingsIcon
            size={"1.4em"}
            onClick={() => {
              setSettingsDialogOpen(true);
            }}
            title={t("menu.icons.settings")}
          />
          <StyledLanguageIcon
            size={"1.4em"}
            onClick={() => {
              const targetLanguage = i18n.language === "en" ? "cz" : "en";
              i18n.changeLanguage(targetLanguage);
            }}
            title={t("menu.icons.language")}
          />
        </div>
      </StyledMenu>
    </>
  );
};
