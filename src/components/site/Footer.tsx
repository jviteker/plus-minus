import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export type FooterPropsType = {};

const Defaults: Partial<FooterPropsType> = {};

const StyledFooter = styled.footer`
  font-style: italic;
  padding-bottom: 1em;
  padding-left: 2em;
  font-size: smaller;
`;

export const Footer: FunctionComponent<FooterPropsType> = (props) => {
  props = {
    ...Defaults,
    ...props,
  };

  const { t } = useTranslation();

  return (
    <StyledFooter>
      {t("contact.main")}: Jaromír Viteker - plus-minus.cz@seznam.cz
    </StyledFooter>
  );
};
