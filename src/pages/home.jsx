import * as React from "react";
import { Link } from "wouter";
import { TITLE } from "../static/globals";
import TopBar from "../components/TopBar";
import Game from "../components/Game";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export default function Home() {
  return (
    <Container>
      <TopBar />
      <Game />
    </Container>
  );
}
