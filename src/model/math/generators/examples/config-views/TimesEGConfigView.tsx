import produce from "immer";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  StyledFlexRow,
  StyledShortInput,
  StyledShortInputD,
} from "../../../../../components/lib/StyledBits";
import { TimesExamplesGeneratorConfig } from "../numbers/TimesEG";

type ConfigType = TimesExamplesGeneratorConfig;

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

export const TimesEGConfigView: FunctionComponent<ConfigViewPropsType> = (
  props
) => {
  props = {
    ...Defaults,
    ...props,
  };

  const { config, active } = props;
  const { t } = useTranslation();
  // {t("times.")}

  return (
    <StyledContainer>
      <StyledFlexRow>
        <label>
          <b>{t("times.name")}</b>
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
            {t("times.opsCount")}:
            <StyledShortInputD
              type={"number"}
              value={config.operands.count}
              min={2}
              max={20}
              onChangeDebounced={(v) => {
                const changed = produce(config, (config) => {
                  config.operands.count = Number(v);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
          <label>
            {t("times.min")}:
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
            {t("times.max")}:
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
            {t("times.decimalDigitsCount")}:
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
