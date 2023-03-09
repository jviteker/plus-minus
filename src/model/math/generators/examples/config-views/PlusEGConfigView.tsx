import produce from "immer";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import {
  StyledFlexRow,
  StyledShortInput,
} from "../../../../../components/lib/StyledBits";
import {
  PlusExamplesGenerator,
  PlusExamplesGeneratorConfig,
} from "../numbers/PlusExamplesGenerator";

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

  const { config, active } = props;

  return (
    <StyledContainer>
      <StyledFlexRow>
        <label>
          <b>Addition</b>
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
            Count of operands:
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
            Min. value:
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
            Max. value:
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
            Decimal digits count:
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
        </StyledFlexRow>
      )}
    </StyledContainer>
  );
};