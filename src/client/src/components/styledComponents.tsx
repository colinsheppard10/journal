import styled, { keyframes } from "styled-components";
import { ReactComponent as RawJournalIcon } from "../static/journal.svg";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div<{ size?: string }>`
  display: inline-block;
  width: ${(props) => (props.size ? props.size : ".7")}em;
  height: ${(props) => (props.size ? props.size : ".7")}em;
  border-radius: 60%;
  border: 3px solid rgba(0, 0, 0, 0);
  border-top-color: black;
  animation: ${rotate} 0.7s linear infinite;
`;

export const CenterSpinnerPage = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <StyledSpinner size="3" />
  </div>
);

export const JournalIcon = ({
  height,
  windowSize,
}: {
  height?: string;
  windowSize?: string;
}) => {
  return (
    <RawJournalIcon
      style={{
        height: height,
        widows: windowSize,
        cursor: 'pointer'
      }}
      onClick={() => window.location.replace("/")}
    />
  );
};

export const Button = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "7em")};
  display: flex;
  color: #001d35;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 1em;
  background-color: lightblue;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #9bc4d1;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
  border: 0px;
  overflow: auto;
  outline: none;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
`;

export const TextArea2 = styled.textarea`
  width: 99%;
  flex-grow: 1;
  border: 0px;
  overflow: auto;
  outline: none;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
`;
