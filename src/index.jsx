import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import { HelmetProvider } from 'react-helmet-async';
import { createGlobalStyle } from 'styled-components';
import {theme} from "./styles/theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.backgroundColor};
    color: ${theme.textColor};
  }
`
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <GlobalStyle />
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
