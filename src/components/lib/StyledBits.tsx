import styled from "styled-components";
import { Input } from "./Input";

export const StyledShortInput = styled.input`
  width: 3em;
  border: none;
  border-bottom: 1px solid gray;
  text-align: right;
  outline: none;
  font-size: 1em;
  background-color: transparent;

  &:disabled {
    color: #cccccc;
  }
`;

export const StyledShortInputD = styled(Input)`
  width: 2.8em;
  border: none;
  border-bottom: 1px solid gray;
  text-align: right;
  outline: none;
  font-size: 1em;
  background-color: transparent;

  &:disabled {
    color: #cccccc;
  }
`;

export const StyledSelect = styled.select`
  border: none;
  border-bottom: 1px solid gray;
  background-color: transparent;
  outline: none;
  font-size: 1em;
`;

export const StyledFlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 2em;

  label {
    width: 100%;

    @media (min-width: 210mm) {
      width: auto;
    }
  }
`;

export const StyledError = styled.h2`
  text-align: center;
  font-size: 1.4em;
  margin: 4em;
`;
