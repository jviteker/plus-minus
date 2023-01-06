import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @media screen {
    html, body {
      margin: 0;
      background-color: #eeeeee;
    }
  }

  @page {
    size: A4;
    margin: 10mm 0mm;
  }
`;
