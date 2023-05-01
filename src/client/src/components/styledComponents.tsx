import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div`
  display: inline-block;
  width: .7em;
  height: .7em;
  border-radius: 60%;
  border: 3px solid rgba(0,0,0,0);
  border-top-color: black;
  animation: ${rotate} .7s linear infinite;
`;

export const Button = styled.div<{ width?: string }>`
  width: ${props => props.width ? props.width : '7em'};
  display: flex;
  color: black;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 1em;
  background-color: lightblue;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer; 
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: lightblue;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
`;