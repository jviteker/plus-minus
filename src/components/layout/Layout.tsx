import {
  Children,
  Fragment,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import styled from "styled-components";

export const XPage = styled.div`
  background-color: white;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;

  @media screen {
    width: 210mm;
    height: 277mm;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 5px 5px 2px gray;
  }

  @media print {
    width: 210mm;
    height: 277mm;
  }
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &.even {
    transform: rotate(180deg);
  }
`;

export const VerticalCut = styled.div<{ left: string }>`
  position: absolute;
  left: ${(p) => p.left}%;
  top: 0px;
  width: 1px;
  height: 100%;
  border-left: 1px dashed gray;
`;

const StyledColumns = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;
const StyledColumn = styled.div<{ width: string }>`
  flex-basis: ${(p) => p.width}%;

  &:last-child {
    border-right: none;
  }
`;

type ColumnsPropsType = {} & PropsWithChildren;

export const Columns: FunctionComponent<ColumnsPropsType> = (props) => {
  const childrenAsArray = Children.toArray(props.children);
  const count = childrenAsArray.length;

  const width = 100 / count;
  const widthAsString = width.toFixed(2);

  return (
    <StyledColumns>
      {childrenAsArray.map((ch, i) => {
        return (
          <Fragment key={i}>
            <StyledColumn width={widthAsString}>{ch}</StyledColumn>
            {i < count - 1 && false && (
              <VerticalCut left={(width * (i + 1)).toFixed(2)} />
            )}
          </Fragment>
        );
      })}
    </StyledColumns>
  );
};
