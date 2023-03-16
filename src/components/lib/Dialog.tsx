import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

export type DialogPropsType = {
  title: string | ReactElement;

  onClose: () => void;
};

const Defaults: Partial<DialogPropsType> = {};

const StyledLayer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  isolation: isolate;
  position: fixed;
  z-index: 3;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #cccccc99;
`;

const StyledDialog = styled.div`
  background-color: white;
  box-shadow: 5px 5px 2px gray;
  //border: 1px solid #666666;
  width: 80vw;
  min-width: 300px;
  position: absolute;
  left: 50vw;
  top: 8%;
  transform: translate(-50%, 0%);

  .header {
    padding: 0.5em;
    background-color: #fdfda7;
    border-bottom: 1px solid #cccccc;
    display: flex;

    .title {
      flex-grow: 1;
    }

    .close {
    }
  }

  .payload {
    padding: 1em;
    max-height: 80vh;
    overflow-y: auto;
  }
`;

const StyledCloseIcon = styled(FaTimes)`
  cursor: pointer;
`;

export const Dialog: FunctionComponent<PropsWithChildren<DialogPropsType>> = (
  props
) => {
  props = {
    ...Defaults,
    ...props,
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.key === "Escape" && props.onClose();
    };

    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, []);

  return (
    <StyledLayer>
      <StyledDialog>
        <div className="header">
          <span className="title">{props.title}</span>
          <span className="close">
            <StyledCloseIcon
              onClick={() => {
                props.onClose();
              }}
            />
          </span>
        </div>
        <div className="payload">{props.children}</div>
      </StyledDialog>
    </StyledLayer>
  );
};
