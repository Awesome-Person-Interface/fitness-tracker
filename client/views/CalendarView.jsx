import React, { useMemo, useState, useCallback } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';
import Navigation from '../components/navigation/Navigation.jsx';

const localizer = dayjsLocalizer(dayjs);

const startEvents = [
  {
    id: 1,
    title: 'Breakfast',
    start: new Date(2025, 0, 5),
    end: new Date(2025, 0, 6),
    allDay: false,
  }
];

function CalendarView({ handleThemeChange }) {
  const [events, setEvents] = useState(startEvents);

  const handleSelectSlot = useCallback(({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents((prev) => [...prev, { start, end, title }]);
    }
  }, [setEvents]);

  const handleSelectEvent = useCallback((event) => {
    window.alert(event.title);
    console.log(event);
  }, []);

  const { defaultDate, scrollToTime } = useMemo(() => ({
    defaultDate: Date.now(),
    scrollToTime: new Date(1970, 1, 1, 6),
  }), []);

  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange} />
      <br></br>
      <Grid container spacing={2}>
        <Grid size={4}>

        </Grid>
        <Grid size={8}>
          <Calendar
            defaultDate={defaultDate}
            defaultView={Views.MONTH}
            events={events}
            localizer={localizer}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            scrollToTime={scrollToTime}
            style={{
              // Must set a minHeight for the calendar events to be visible
              minHeight: 550,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CalendarView;
