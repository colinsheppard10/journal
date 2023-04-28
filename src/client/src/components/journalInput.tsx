import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, StyledSpinner } from './styledComponents';
import { TextArea } from './journalInputGPT';



const JournalInput = () => {

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
        if (responseText) {
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


  return <MainContainer>
    <TopRow>
      <SideColumn>
      </SideColumn>
      <MiddleColumn
        style={{
          alignSelf: 'flex-end',
          border: '1px solid #c7c7c74d',
          borderBottom: '0px'
        }}
      >
        January 1, 2021
      </MiddleColumn>
      <SideColumn>
      </SideColumn>
    </TopRow>

    <BottomRow>
      <SideColumn>
        <>
        <Button
          onClick={handleClick}
        >
          {loading ? <StyledSpinner /> : 'Summarize'}
        </Button>
        <>
          {summary.map((summaryItem, index) => {
            return <SummaryItem key={index}>
              {summaryItem}
            </SummaryItem>
          })}
        </>
        </>
      </SideColumn>
      <MiddleColumn
        style={{
          border: '1px solid #c7c7c74d',
          borderTop: '0px',
          paddingTop: '.5em'
        }}
      >
        <TextArea
          id="textInput"
          placeholder={`Today's Journal Entry`}
          onChange={handleChange}
          value={text}
        />
      </MiddleColumn>
      <SideColumn>
      </SideColumn>
    </BottomRow>
  </MainContainer>

}

const SummaryItem = styled.div`
  margin: 1em 2em 0em 2em;
  text-align: left;
`;

//width: 70vw;
const MiddleColumn = styled.div`
  display: flex;
  background-color: white;
  flex: 70%;
  padding: 2em;
`;

// width: 15vw;
const SideColumn = styled.div`
  display: flex;
  background-color: #f9fbfd;
  flex-direction: column;
  align-items: center;
  flex: 15%;
`;

const TopRow = styled.div`
  display: flex;
  background-color: #f9fbfd;
  height: 20vh;
`;

const BottomRow = styled.div`
  display: flex;
  background-color: #f9fbfd;
  height: 70vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fbfd;
  height: 100vh;
`;

export default JournalInput;