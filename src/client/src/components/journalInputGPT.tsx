import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, StyledSpinner } from './styledComponents';

const TopBox = styled.div`
  width: 100vw;
  height: 12.5vh;
  background-color: #f9fbfd;
`;

const CenterContainer = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  justify-content: center;
`;

const CenterBox = styled.div`
  width: 75vw;
  height: 125vh;
  background-color: red;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const SideBox = styled.div`
  width: 25vw;
  height: 125vh;
  background-color: #f9fbfd;
  position: sticky; top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryItem = styled.div`
  margin: 1em 2em 0em 2em;
  text-align: left;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: 0px;
  overflow: auto;
  outline: none;
  font-size: 16px;   
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
`;

const Boxes = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState([] as any[]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    setLoading(true)
    axios.post('/api/journal', {
      entry: text,
    })
      .then(function (response) {
        let responseText = response.data?.responseText
        if(responseText){
          setSummary(responseText.split(/[•-]/))
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <TopBox />
      <CenterContainer>
        <SideBox>
          <Button
            onClick={handleClick}
          >
            {loading? <StyledSpinner/> : 'Summarize'}
          </Button>
          <>
            {summary.map((summaryItem, index) => {
              return <SummaryItem key={index}>
                {summaryItem}
              </SummaryItem>
            })}
          </>
        </SideBox>
        <CenterBox>
          <TextArea
            id="textInput"
            placeholder={`Today's Journal Entry`}
            onChange={handleChange}
            value={text}
          />
        </CenterBox>
        <SideBox />
      </CenterContainer>
    </>
  );
}

export default Boxes;