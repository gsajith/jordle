import * as React from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
  color: ${(props) => props.theme.popupTextColor};
  background: ${(props) => props.theme.popupBackgroundColor};
  border-radius: 4px;
  padding: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  width: fit-content;
  align-items: center;
  font-size: 14px;
  margin: 8px;
`;

export const Toast = ({ text }) => {
  return <ToastContainer>{text}</ToastContainer>;
};

export default Toast;
