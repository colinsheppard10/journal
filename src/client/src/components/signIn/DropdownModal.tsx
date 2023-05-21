import { useContext, useState } from "react";
import { LoginStatus, UserContext } from "../../context/userContext";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Divider from "@mui/material/Divider/Divider";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Box from "@mui/material/Box/Box";
import Collapse from "@mui/material/Collapse/Collapse";

const DropdownModal = ({ closeModal }: any) => {
  const userContext = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const { firstName, lastName, email } = userContext;
  const onLogout = async () => {
    localStorage.setItem("journalAuthTokenGoogle", "");
    localStorage.setItem("journalAuthTokenEmail", "");
    userContext.updateUserContext({
      loginStatus: LoginStatus.LOGGED_OUT,
      id: undefined,
      firstName: undefined,
      lastName: undefined,
      locale: undefined,
      picture: undefined,
    });
  };

  return ReactDOM.createPortal(
    <Background onClick={closeModal}>
      <Dropdown
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownIntroItem>{`${firstName} ${lastName}`}</DropdownIntroItem>
        <Collapse orientation="vertical" in={showProfile}>
          {showProfile && (
            <DropdownIntroItem
              style={{
                paddingTop: "0em",
              }}
            >{`${email}`}</DropdownIntroItem>
          )}
        </Collapse>

        <Divider />
        <DropdownItem onClick={() => setShowProfile(!showProfile)}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={onLogout}>Log Out</DropdownItem>
      </Dropdown>
    </Background>,
    document.querySelector("#modal") as Element
  );
};

// Dropdown component
const Dropdown = styled.div`
  position: absolute;
  top: 2em;
  right: 1%;
  background-color: var(--journal-white);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 0.5rem 0rem;
  margin: 1em;
  cursor: pointer;
`;

const DropdownIntroItem = styled.div`
  padding: 0.5em 1em;
`;

const DropdownItem = styled.div`
  padding: 0.5em 1em;
  &:hover {
    background-color: var(--journal-lightgrey);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const Background = styled.div`
  position: relative;
  z-index: 9999;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

export default DropdownModal;
