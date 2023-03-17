import produce from "immer";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  StyledFlexRow,
  StyledShortInput,
  StyledShortInputD,
} from "../../../../../components/lib/StyledBits";
import { PlusEG, PlusExamplesGeneratorConfig } from "../numbers/PlusEG";

type ConfigType = PlusExamplesGeneratorConfig;

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

export const PlusEGConfigView: FunctionComponent<ConfigViewPropsType> = (
  props
) => {
  props = {
    ...Defaults,
    ...props,
  };

  const { t } = useTranslation();

  const { config, active } = props;

  return (
    <StyledContainer>
      <StyledFlexRow>
        <label>
          <b>{t("plus.name")}</b>
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
            {t("plus.opsCount")}:
            <StyledShortInputD
              type={"number"}
              value={config.operands.count}
              min={2}
              max={5}
              onChangeDebounced={(value, e) => {
                const changed = produce(config, (config) => {
                  config.operands.count = Number(value);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>

          <label>
            {t("plus.resultBetween")}::
            <StyledShortInputD
              type={"number"}
              value={config.result.min}
              min={0}
              max={config.result.max - 1}
              onChangeDebounced={(v) => {
                const changed = produce(config, (config) => {
                  config.result.min = Number(v);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
            &nbsp; {t("and")}: &nbsp;
            <StyledShortInputD
              type={"number"}
              min={config.result.min + 1}
              value={config.result.max}
              onChangeDebounced={(v) => {
                const changed = produce(config, (config) => {
                  config.result.max = Number(v);
                });

                props.onConfigChanged && props.onConfigChanged(changed);
              }}
            />
          </label>

          {/* <label>
            {t("plus.min")}:
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
            {t("plus.max")}:
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
          </label> */}
          <label>
            {t("plus.decimalDigitsCount")}:
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
