import produce from "immer";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  StyledFlexRow,
  StyledShortInput,
  StyledShortInputD,
} from "../../../../../components/lib/StyledBits";
import { CompareExamplesGeneratorConfig } from "../numbers/CompareEG";

type ConfigType = CompareExamplesGeneratorConfig;

type ConfigViewPropsType = {
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

export const CompareEGConfigView: FunctionComponent<ConfigViewPropsType> = (
  props
) => {
  props = {
    ...Defaults,
    ...props,
  };

  const { config, active } = props;
  const { t } = useTranslation();
  // {t("compare.")}
  return (
    <StyledContainer>
      <StyledFlexRow>
        <label>
          <b>{t("compare.name")}</b>
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
            {t("compare.min")}:
            <StyledShortInputD
              type={"number"}
              value={config.operands.min}
              min={0}
              max={config.operands.max - 1}
              onChangeDebounced={(v) => {
                const changed = produce(config, (config) => {
                  config.operands.min = Number(v);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
          <label>
            {t("compare.max")}:
            <StyledShortInputD
              type={"number"}
              value={config.operands.max}
              min={config.operands.min + 1}
              onChangeDebounced={(v) => {
                const changed = produce(config, (config) => {
                  config.operands.max = Number(v);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>

          <label>
            {t("compare.decimalDigitsCount")}:
            <StyledShortInputD
              type={"number"}
              value={config.operands.decimalDigits}
              min={0}
              onChangeDebounced={(v) => {
                const changed = produce(config, (config) => {
                  config.operands.decimalDigits = Number(v);
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
