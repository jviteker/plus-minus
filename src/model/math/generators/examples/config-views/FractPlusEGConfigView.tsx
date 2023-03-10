import produce from "immer";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  StyledFlexRow,
  StyledShortInput,
} from "../../../../../components/lib/StyledBits";
import { FractionsPlusExamplesGeneratorConfig } from "../FractPlusEG";

type ConfigType = FractionsPlusExamplesGeneratorConfig;

export type ConfigViewPropsType = {
  config: ConfigType;
  onConfigChanged: (config: ConfigType) => void;
  active: boolean;
  onActivityToggle: (active: boolean) => void;
};

const Defaults: Partial<ConfigViewPropsType> = {};

const StyledContainer = styled.div`
  line-height: 2em;

  .config {
    padding-left: 1em;
  }
`;

export const FractPlusEGConfigView: FunctionComponent<ConfigViewPropsType> = (
  props
) => {
  props = {
    ...Defaults,
    ...props,
  };

  const { config, active } = props;
  const { t } = useTranslation();
  // {t("fractPlus.")}

  return (
    <StyledContainer>
      <StyledFlexRow>
        <label>
          <b>{t("fractPlus.name")}</b>
          <StyledShortInput
            type={"checkbox"}
            checked={active}
            onChange={(e) => {
              props.onActivityToggle(e.currentTarget.checked);
            }}
          />
        </label>
      </StyledFlexRow>
      {active && (
        <StyledFlexRow className={"config"}>
          <label>
            {t("fractPlus.opsCount")}:
            <StyledShortInput
              type={"number"}
              value={config.operands.count}
              min={2}
              max={20}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.operands.count = Number(e.currentTarget.value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
          <label>
            {t("fractPlus.nmin")}:
            <StyledShortInput
              type={"number"}
              value={config.operands.nmin}
              min={0}
              max={config.operands.nmax - 1}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.operands.nmin = Number(e.currentTarget.value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
          <label>
            {t("fractPlus.nmax")}:
            <StyledShortInput
              type={"number"}
              value={config.operands.nmax}
              min={config.operands.nmin + 1}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.operands.nmax = Number(e.currentTarget.value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
          <label>
            {t("fractPlus.dmin")}:
            <StyledShortInput
              type={"number"}
              value={config.operands.dmin}
              min={0}
              max={config.operands.dmax - 1}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.operands.dmin = Number(e.currentTarget.value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
          <label>
            {t("fractPlus.dmax")}:
            <StyledShortInput
              type={"number"}
              value={config.operands.dmax}
              min={config.operands.dmin + 1}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.operands.dmax = Number(e.currentTarget.value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
        </StyledFlexRow>
      )}
    </StyledContainer>
  );
};
