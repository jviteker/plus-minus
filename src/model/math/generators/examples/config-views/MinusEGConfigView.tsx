import produce from "immer";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  StyledFlexRow,
  StyledShortInput,
} from "../../../../../components/lib/StyledBits";
import { MinusExamplesGeneratorConfig } from "../numbers/MinusExamplesGenerator";

type ConfigType = MinusExamplesGeneratorConfig;

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

export const MinusEGConfigView: FunctionComponent<ConfigViewPropsType> = (
  props
) => {
  props = {
    ...Defaults,
    ...props,
  };

  const { t } = useTranslation();

  const { config, active } = props;

  // {t("minus.")}

  return (
    <StyledContainer>
      <StyledFlexRow>
        <label>
          <b>{t("minus.name")}</b>
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
            {t("minus.opsCount")}:
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
            {t("minus.min")}:
            <StyledShortInput
              type={"number"}
              value={config.operands.min}
              min={0}
              max={config.operands.max - 1}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.operands.min = Number(e.currentTarget.value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
          <label>
            {t("minus.max")}:
            <StyledShortInput
              type={"number"}
              value={config.operands.max}
              min={config.operands.min + 1}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.operands.max = Number(e.currentTarget.value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>
          <label>
            {t("minus.decimalDigitsCount")}:
            <StyledShortInput
              type={"number"}
              value={config.operands.decimalDigits}
              min={0}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.operands.decimalDigits = Number(e.currentTarget.value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>

          <label>
            {t("minus.allowNegativeResults")}:
            <StyledShortInput
              type={"checkbox"}
              checked={config.result.allowNegative}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.result.allowNegative = Boolean(
                    e.currentTarget.checked
                  );
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
