import produce from "immer";
import { FunctionComponent } from "react";
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

  return (
    <StyledContainer>
      <StyledFlexRow>
        <label>
          <b>Fractions addition</b>
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
            Nominator min. value:
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
            Nominator max. value:
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
            Denominator min. value:
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
            Denominator max. value:
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
