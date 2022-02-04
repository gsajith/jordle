import * as React from "react";
import styled from "styled-components";
import { TITLE } from "../static/globals";

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 800;
  font-size: 16px;
`;

export const TopBar = () => {
  return (
    <>
      <Title>{TITLE}</Title>blah??
    </>
  );
};

export default TopBar;
