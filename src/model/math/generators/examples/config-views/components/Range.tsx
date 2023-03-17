import { ObjectLeaves } from "../../../../../utils/UtilityTypes";

import { t } from "i18next";
import produce from "immer";
import _ from "lodash";
import { PropsWithChildren, ReactElement } from "react";
import { StyledShortInputD } from "../../../../../../components/lib/StyledBits";

export type RangePropsType<T extends object> = {
  label: string;
  config: T;
  minPath: ObjectLeaves<T, 3>;
  maxPath: ObjectLeaves<T, 3>;
  onConfigChanged: (config: T) => void;
};

export const Range = <T extends object>(
  props: PropsWithChildren<RangePropsType<T>>
): ReactElement | null => {
  const { config, minPath, maxPath } = props;
  const min = _.get(config, props.minPath) as number;
  const max = _.get(config, props.maxPath) as number;

  return (
    <label>
      {props.label}:
      <StyledShortInputD
        type={"number"}
        value={min}
        min={0}
        max={max - 1}
        onChangeDebounced={(v) => {
          const changed = produce(config, (config) => {
            _.set(config, minPath, Number(v));
          });

          props.onConfigChanged(changed);
        }}
      />
      &nbsp; {t("and")} &nbsp;
      <StyledShortInputD
        type={"number"}
        min={min + 1}
        value={max}
        onChangeDebounced={(v) => {
          const changed = produce(config, (config) => {
            _.set(config, maxPath, Number(v));
          });

          props.onConfigChanged(changed);
        }}
      />
    </label>
  );
};
