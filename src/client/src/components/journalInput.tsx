import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, StyledSpinner, TextArea, TextArea2 } from "./styledComponents";
import { fullDateFormat, getLocalDate } from "./util";
import { UserContext } from "../context/userContext";
import { createJournal } from "../api/user";
import { animateScroll as scroll } from "react-scroll";

export type JournalValue = {
  journalEntry: string;
  timestamp: string;
  summary: string;
};

const formatMessage = ({ userId, timestamp, entry }: any) => {
  return JSON.stringify({ userId, timestamp, entry });
};

const parseResponseText = (responseText: string | null) => {
  if (responseText) return responseText.split(/[•-]/);
  return [];
};

const JournalInput = ({
  onSubmitJournal,
  journalValue,
}: {
  onSubmitJournal: any;
  journalValue: JournalValue;
}) => {
  const { journalEntry, timestamp, summary: summaryText } = journalValue;
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const [summary, setSummary] = useState(
    parseResponseText(summaryText) as any[]
  );
  const [todayKey, setTodayKey] = useState("");
  const { id: userId } = useContext(UserContext);

  useEffect(() => {
    // TODO: this is creating multiple entries on the server.
    // - replace the timestamp with date

    let newTodayKey = `${getLocalDate(timestamp)}:${userId}`;
    let storedTextInputValue = localStorage.getItem(newTodayKey);
    if (storedTextInputValue) {
      setText(storedTextInputValue);
    } else {
      setText(journalEntry);
    }
    setTodayKey(newTodayKey);
    setSummary(parseResponseText(summaryText));
  }, [journalEntry, timestamp, userId, summaryText]);

  // useEffect(() => {
  //   setWsConnection(new WebSocket(`ws://localhost:3003`));
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (wsConnection && wsConnection?.readyState === wsConnection?.OPEN) {
      let message = {
        userId,
        timestamp,
        entry: e.target.value,
      };
      wsConnection.send(formatMessage(message));
    } else {
      console.error("no connection");
    }

    // Store the text in LocalStorage
    localStorage.setItem(todayKey, e.target.value);
    setText(e.target.value);
  };

  const afterJournalCreate = (response: any) => {
    setSummary(parseResponseText(response.data?.responseText));
    onSubmitJournal();
    scroll.scrollToBottom();
  };

  const handleClick = () => {
    createJournal({
      payload: {
        entry: text,
        timestamp,
        userId,
        date: getLocalDate(timestamp),
      },
      callback: afterJournalCreate,
    });
  };

  const todayDate = new Date(Number(timestamp)).toLocaleString(
    "default",
    fullDateFormat
  );
  return (
    <ContentContainer>
      <JournalContainer>
        <DateContainer>{todayDate}</DateContainer>
        <TextAreaContainer>
          <TextArea2
            id="textInput"
            placeholder={`Today's Journal Entry`}
            onChange={handleChange}
            value={text}
          />
        </TextAreaContainer>
        <SaveContainer>
          <Button onClick={handleClick}>
            {loading ? <StyledSpinner /> : "Save and Summarize"}
          </Button>
        </SaveContainer>
      </JournalContainer>
      <SummaryContainer>
        <Heading>Here is your summary for {todayDate}</Heading>
        <SummaryContent>
          {summary.length ? (
            summary.map((summaryItem, index) => {
              return <SummaryItem key={index}>{summaryItem}</SummaryItem>;
            })
          ) : (
            <SummaryItem noContent={true}>
              click the "Save and Summarize" button to view a summary of your
              journal
            </SummaryItem>
          )}
        </SummaryContent>
      </SummaryContainer>
    </ContentContainer>
  );
};

const Heading = styled.div`
  text-align: center;
`;

const SummaryItem = styled.div<{ noContent?: boolean }>`
  margin: 1em 0em 0em 0em;
  color: var(--journal-${(props) => (props.noContent ? "darkgrey" : "black")});
  text-align: left;
`;

const SummaryContent = styled.div`
  word-wrap: break-word;
  flex-grow: 1;
`;

const SummaryContainer = styled.div`
  margin: 2em 0em;
  padding: 2em;
  background-color: var(--journal-white);
  border-radius: 8px;
  border: 1px solid var(--journal-bordergrey);
`;

const DateContainer = styled.div`
  margin: 2em 0em 0em 2em;
`;

const SaveContainer = styled.div`
  margin: 0em 0em 2em 2em;
`;

export const TextAreaContainer = styled.div`
  flex-grow: 1;
  background-color: var(--journal-white);
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const JournalContainer = styled.div`
  min-height: 50vh;
  background-color: var(--journal-white);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid var(--journal-bordergrey);
`;

const ContentContainer = styled.div`
  padding-top: 2em;
`;

export default JournalInput;
