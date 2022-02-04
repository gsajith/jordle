import * as React from "react";
import { Link } from "wouter";
import { GAME_TITLE } from "../static/globals";
import {TopBar} from "../components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar/>
      <h1 className="title">{GAME_TITLE}</h1>
    </>
  );
}
