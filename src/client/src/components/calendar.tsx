import styled from "styled-components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button } from "./styledComponents";
import { createSummary } from "../api/user";
import { useState } from "react";
import { animateScroll as scroll } from "react-scroll";

const localizer = momentLocalizer(moment);

export type CalendarEvent = {
  title: string;
  start: string;
  end: string;
  timestamp: string;
  summary: string;
};

export type SummaryOptions = {
  display: string;
  optionId: string;
  summaryDisplay: string;
};

enum OPTION_ID {
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

const initialSummaries: SummaryOptions[] = [
  {
    display: "1 Week",
    optionId: OPTION_ID.WEEK,
    summaryDisplay: "",
  },
  {
    display: "1 Month",
    optionId: OPTION_ID.MONTH,
    summaryDisplay: "",
  },
  {
    display: "1 Year",
    optionId: OPTION_ID.YEAR,
    summaryDisplay: "",
  },
];

const getEventStyle = (event: any) => {
  let newStyle = {
    backgroundColor: "lightBlue",
    color: "black",
    maxWidth: "20em",
  };
  return {
    className: "",
    style: newStyle,
  };
};

const CalendarComponent = ({
  onEventClicked,
  events,
}: {
  onEventClicked: (e: any) => void;
  events: CalendarEvent[];
}) => {
  const [summaries, setSummaries] = useState(initialSummaries);

  const afterCreateSummary = (res: any) => {
    let summaryText = res.data?.responseText?.summary;
    let timeFrame = res.data?.responseText?.timeFrame;

    setSummaries((summaries) => {
      return summaries.map((summary) => {
        if (summary.optionId === timeFrame)
          return { ...summary, summaryDisplay: summaryText };
        return summary;
      });
    });
    scroll.scrollToBottom();
  };

  const onSelectEvent = (event: CalendarEvent) => {
    onEventClicked(event);
  };

  return (
    <>
      <ContentContainer>
        <MiddleColumn>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: "100%",
              width: "100%",
            }}
            eventPropGetter={getEventStyle}
            onSelectEvent={onSelectEvent}
          />
        </MiddleColumn>
      </ContentContainer>
      <ContentContainer>
        <MiddleColumn height="100%">
          <HeadingContainer>
            <Heading>
              Here are your themes over the last week, month, and year
            </Heading>
          </HeadingContainer>
          {summaries.map((option: SummaryOptions) => {
            const { display, optionId, summaryDisplay } = option;
            const noDisplay = summaryDisplay.length <= 0;
            return (
              <SummaryContainer key={optionId}>
                <Button
                  onClick={() => {
                    createSummary({
                      payload: { timeFrame: optionId },
                      callback: afterCreateSummary,
                    });
                  }}
                  style={{
                    margin: ".5em",
                  }}
                >
                  {display}
                </Button>
                <Summary noDisplay={noDisplay}>
                  {noDisplay
                    ? `<= click to get your themes over the last ${optionId}`
                    : summaryDisplay}
                </Summary>
              </SummaryContainer>
            );
          })}
        </MiddleColumn>
      </ContentContainer>
    </>
  );
};

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;

const Heading = styled.div``;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Summary = styled.div<{ noDisplay?: boolean }>`
  margin: 1em;
  color: var(--journal-${(props) => (props.noDisplay ? "darkgrey" : "black")});
`;

const MiddleColumn = styled.div<{ height?: string }>`
  background-color: var(--journal-white);
  border: 1px solid var(--journal-bordergrey);
  flex: 70%;
  padding: 2em;
  border-radius: 8px;
  max-width: 70vw;
  height: ${(props) => props.height || "40vh"};
`;

const ContentContainer = styled.div`
  display: flex;
  padding-top: 2em;
`;

export default CalendarComponent;
