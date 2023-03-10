import _ from "lodash";
import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

export type InputPropsType = {
  className?: string;
  type?: string;
  min?: number;
  max?: number;
  value: string | number;
  onChangeDebounced: (value: string | number, e: ChangeEvent) => void;
  disabled?: boolean;
};

const Defaults: Partial<InputPropsType> = {};
const DEBOUNCE_TIME = 200;

export const Input: FunctionComponent<InputPropsType> = (props) => {
  props = {
    ...Defaults,
    ...props,
  };

  const [value, setValue] = useState(props.value);
  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  const debouncedOnChange = useCallback(
    _.debounce((value: string | number, e: ChangeEvent<HTMLInputElement>) => {
      props.onChangeDebounced(value, e);
    }, DEBOUNCE_TIME),
    []
  );

  return (
    <input
      className={props.className}
      type={props.type}
      min={props.min}
      max={props.max}
      value={value}
      disabled={props.disabled}
      onChange={(e) => {
        setValue(e.currentTarget.value);
        debouncedOnChange(e.currentTarget.value, e);
      }}
    />
  );
};
