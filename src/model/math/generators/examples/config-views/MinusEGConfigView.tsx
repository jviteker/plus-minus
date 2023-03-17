import produce from "immer";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  StyledFlexRow,
  StyledShortInput,
  StyledShortInputD,
} from "../../../../../components/lib/StyledBits";
import { MinusExamplesGeneratorConfig } from "../numbers/MinusEG";
import { Range } from "./components/Range";

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
          <Range
            label={t("minus.operandsBetween")}
            config={config}
            minPath={"operands.min"}
            maxPath={"operands.max"}
            onConfigChanged={props.onConfigChanged}
          />

          <label>
            {t("minus.decimalDigitsCount")}:
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

          <label>
            {t("minus.allowNegativeResults")}:
            <StyledShortInput
              type={"checkbox"}
              checked={config.result.allowNegative || config.operands.count > 2}
              disabled={config.operands.count > 2}
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
