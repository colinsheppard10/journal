import styled from "styled-components";
import { Button } from "./styledComponents";

export type Tab = {
  text: any;
  id: any;
}

export const tabs = [
  {text: 'Calendar', id: 'calendar'},
  {text: `Today's Journal`, id: 'journal'},
]

const Header = ({setActiveTab}: any) => {
  return <HeaderContainer>
    <SideColumn></SideColumn>
    <MiddleColumn>
      {tabs.map((tab: Tab) => {
        const {text, id} = tab;
        return <Button
          key={id}
          onClick={() => setActiveTab(tab)}
          style={{
            margin: '.5em'
          }}
        >
          {text}
        </Button>
      })}
    </MiddleColumn>
    <SideColumn/>
  </HeaderContainer>
}

//width: 70vw;
const MiddleColumn = styled.div`
  display: flex;
  flex: 70%;
  justify-content: right;
  padding: 3em 0em .7em 0em;
`;

// width: 15vw;
const SideColumn = styled.div`
  display: flex;
  flex: 15%;
`;

const HeaderContainer = styled.div`
  display: flex;
`;


export default Header;