import React, { useMemo, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import Navigation from '../components/navigation/Navigation.jsx';
import EventDetails from '../components/calendar/EventDetails.jsx';
import CreateEventDialog from '../components/calendar/CreateEventDialog.jsx';

const djLocalizer = dayjsLocalizer(dayjs);

/* EXAMPLE EVENT DATA:
[
  {
    id: 1,
    title: 'Breakfast',
    start: dayjs(new Date(2025, 0, 5)).$d,
    end: dayjs(new Date(2025, 0, 5)).$d,
    allDay: false,
    desc: 'Two banana pancakes & a cup of coffee.',
    category: 'Breakfast',
  }
];
*/

function CalendarView({ handleThemeChange }) {
  const [events, setEvents] = useState([]);
  const [dateSlot, setDateSlot] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = useCallback((event) => {
    setDateSlot(event);
  }, [setDateSlot]);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, [setSelectedEvent]);

  const { defaultDate, scrollToTime } = useMemo(() => ({
    defaultDate: dayjs(Date.now()).$d,
    scrollToTime: dayjs(new Date(1970, 1, 1, 6)).$d,
  }), []);

  const handleCloseDialog = () => {
    setDateSlot({});
  };

  const handleSelectEventClose = () => {
    setSelectedEvent(null);
  };

  const getEvents = () => {
    axios.get('/user/events')
      .then(({ data }) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error('Failed to getEvents:', err);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange} />
      <br></br>
      <Grid container spacing={2}>
        <Grid size={4}>
          {
            selectedEvent
              ? (
                <Box>
                  <EventDetails selectedEvent={selectedEvent}/>
                  <Button
                    onClick={handleSelectEventClose}
                  >
                    Clear
                  </Button>
                </Box>
              ) : (
                <div>No event selected</div>
              )
          }
        </Grid>
        <Grid size={8}>
          <Calendar
            defaultDate={defaultDate}
            defaultView={Views.MONTH}
            events={events}
            localizer={djLocalizer}
            startAccessor={(event) => new Date(event.start)}
            endAccessor={(event) => new Date(event.end)}
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
      <CreateEventDialog
        dateSlot={dateSlot}
        handleCloseDialog={handleCloseDialog}
        getEvents={getEvents}
      />
    </div>
  );
}

export default CalendarView;
