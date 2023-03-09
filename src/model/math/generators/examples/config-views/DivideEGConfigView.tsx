import produce from "immer";
import { FunctionComponent } from "react";
import styled from "styled-components";
import {
  StyledFlexRow,
  StyledShortInput,
} from "../../../../../components/lib/StyledBits";
import { DivideExamplesGeneratorConfig } from "../numbers/DivideEG";

type ConfigType = DivideExamplesGeneratorConfig;

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

export const DivideEGConfigView: FunctionComponent<ConfigViewPropsType> = (
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
          <b>Division</b>
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
            Divider or result min. value:
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
            Divider or result max. value:
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
            Integer result:
            <StyledShortInput
              type={"checkbox"}
              checked={config.result.integerOnly}
              onChange={(e) => {
                const changed = produce(config, (config) => {
                  config.result.integerOnly = Boolean(e.currentTarget.checked);
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
              disabled={config.result.integerOnly}
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
