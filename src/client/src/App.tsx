import { useState } from 'react';
import './App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import JournalInput from './components/journalInput';
import Header, { Tab } from './components/header';
import styled from 'styled-components';
import Calendar, { CalendarEvent } from './components/calendar';
import { DateTime } from 'luxon';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>({ text: `Today's Journal`, id: 'journal' })
  const [date, setDate] = useState(DateTime.now().toFormat('DDDD'))
  const [journalEntry, setJournalEntry] = useState('')

  return (
    <AppContainer>
      <Header
        setActiveTab={setActiveTab}
      />
      <MainContainer>
        {
          activeTab.id === 'journal'
            ? <JournalInput date={date} journalEntry={journalEntry}/>
            : <Calendar 
                onEventClicked={(event: CalendarEvent) => {
                  setDate(event.start.toLocaleString());
                  setJournalEntry(event.title)
                  setActiveTab({ text: `Today's Journal`, id: 'journal' })
            }} />
        }
      </MainContainer>
    </AppContainer>
  );
}

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fbfd;
  height: 100vh;
`;

const AppContainer = styled.div`
  background-color: #f9fbfd;
`;


export default App;

