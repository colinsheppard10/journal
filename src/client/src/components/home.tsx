import { useContext, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import JournalInput, { JournalValue } from "./journalInput";
import styled from "styled-components";
import Calendar, { CalendarEvent } from "./calendar";
import { isSameDay } from "./util";
import { getJournal } from "../api/user";
import AppHeader from "./appHeader";
import { UserContext } from "../context/userContext";
// import Button from "@mui/material/Button";
import { Button } from "./styledComponents";

export type Tab = {
  text: any;
  id: any;
};

export const tabs = [
  { text: "Calendar", id: "calendar" },
  { text: `Today's Journal`, id: "journal" },
];

type JournalProps = {
  id?: string;
  entry: string;
  timestamp: string;
  summary: string;
};

const getEventsFromJournal = (journalEntries: JournalProps[]) => {
  return journalEntries.map((journalEntrie) => {
    const { entry, timestamp, summary } = journalEntrie;
    return {
      title: entry,
      start: new Date(Number(timestamp)).toDateString(),
      end: new Date(Number(timestamp)).toDateString(),
      timestamp: timestamp,
      summary,
    };
  });
};

const getToday = (
  journalEntries: JournalProps[],
  today: string
): JournalValue => {
  let todayJournal = journalEntries.find((journalEntry) => {
    return isSameDay(today, journalEntry.timestamp);
  }) ?? { entry: "", id: undefined, summary: "" };
  return {
    journalEntry: todayJournal.entry,
    timestamp: today,
    summary: todayJournal.summary,
  };
};

const Home = () => {
  const userContext = useContext(UserContext);
  const blankJournal = {
    journalEntry: "",
    timestamp: Date.now().toString(),
    summary: "",
  };
  const [activeJournal, setActiveJournal] =
    useState<JournalValue>(blankJournal);
  const [todayJournal, setTodayJournal] = useState<JournalValue>(blankJournal);
  const [events, setEvents] = useState([] as CalendarEvent[]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>({
    text: `Today's Journal`,
    id: "journal",
  });

  const afterJournalGet = (response: any) => {
    let responseText = response.data?.journal;
    if (responseText) {
      setEvents(getEventsFromJournal(responseText));
      let today = getToday(responseText, Date.now().toString());
      setTodayJournal(today);
      setActiveJournal(today);
    }
  };

  const getJournalWrapper = () => {
    setLoading(true);
    getJournal({ callback: afterJournalGet }).then(() => setLoading(false));
  };

  useEffect(() => {
    getJournalWrapper();
  }, []);

  const shrinkBoarder = window.innerWidth <= 530;
  return (
    <>
      <AppHeader />
      <MainContainer shrinkBoarder={shrinkBoarder}>
        <HeaderContainer>
          {tabs.map((tab: Tab) => {
            const { text, id } = tab;
            return (
              <Button
                key={id}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab.id === "journal") {
                    setActiveJournal(todayJournal);
                  }
                }}
                style={{
                  margin: ".5em",
                }}
              >
                {text}
              </Button>
            );
          })}
        </HeaderContainer>
        {activeTab.id === "journal" ? (
          <JournalInput
            onSubmitJournal={getJournalWrapper}
            journalValue={activeJournal}
          />
        ) : (
          <Calendar
            events={events}
            onEventClicked={(event: CalendarEvent) => {
              setActiveJournal({
                journalEntry: event.title,
                timestamp: event.timestamp,
                summary: event.summary,
              });
              setActiveTab({ text: `Today's Journal`, id: "journal" });
            }}
          />
        )}
      </MainContainer>
    </>
  );
};

export const MainContainer = styled.div<{ shrinkBoarder?: boolean }>`
  margin: 2% ${(props) => (props.shrinkBoarder ? "5" : "15")}%;
  background-color: var(--journal-lightgrey);
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Home;
