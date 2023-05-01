import styled from "styled-components";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Button } from "./styledComponents";
const localizer = momentLocalizer(moment)
let date = new Date();

const events = [
  {
    title: `I have been working on the journal app and it is coming along today I worked from the office.`,
    start: date,
    end: date
  }
]

const getEventStyle = (event: any) => {
  let newStyle = {
    backgroundColor: "lightBlue",
    color: 'black',
  };
  return {
    className: "",
    style: newStyle
  };
}

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
}

const CalendarComponent = ({ onEventClicked }: { onEventClicked: (e: any) => void }) => {

  const onSelectEvent = (event: CalendarEvent) => {
    onEventClicked(event)
  }

  return <>
    <CalendarContainer>
      <SideColumn>
      </SideColumn>
      <MiddleColumn
        style={{
          border: '1px solid #c7c7c74d',
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: '100%',
            width: '100%',
          }}
          eventPropGetter={getEventStyle}
          onSelectEvent={onSelectEvent}
        />
      </MiddleColumn>
      <SideColumn>
      </SideColumn>
    </CalendarContainer>
  </>
}

//width: 70vw;
const MiddleColumn = styled.div`
  display: flex;
  background-color: white;
  flex: 70%;
  padding: 2em;
  height: 50vh;
`;

// width: 15vw;
const SideColumn = styled.div`
  display: flex;
  background-color: #f9fbfd;
  flex-direction: column;
  align-items: center;
  flex: 15%;
`;

const CalendarContainer = styled.div`
  display: flex;
`;


export default CalendarComponent