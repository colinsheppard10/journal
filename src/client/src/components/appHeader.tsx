import styled, { css } from "styled-components";
import { useContext, useState } from "react";
import { LoginStatus, UserContext } from "../context/userContext";
import DropdownModal from "./signIn/DropdownModal";
import { JournalIcon } from "./styledComponents";

const StickyHeader = () => {
  const userContext = useContext(UserContext);
  const { picture, firstName } = userContext;
  const [showDropdown, setShowDropdown] = useState(false);

  console.log(`app header: ${firstName}`)

  return (
    <Header>
      <LeftContainer>
        <JournalIcon
          height="2em"
          windowSize="2em"
        />
      </LeftContainer>
      <DropdownContainer>
        <RightContainer onClick={() => setShowDropdown(true)}>
          <CircularImage>
            <div>
            {firstName?.length ? firstName.charAt(0) : ''}
            </div>
          </CircularImage>
          <Name>{firstName}</Name>
        </RightContainer>
        {showDropdown && (
          <DropdownModal closeModal={() => setShowDropdown(false)} />
        )}
      </DropdownContainer>
    </Header>
  );
};

const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  padding: 1em 0em;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2em;
  cursor: pointer;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-left: 2em;
`;

const Name = styled.span`
  margin-left: 1em;
`;

const CircularImage = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--journal-lightblue);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

export default StickyHeader;
