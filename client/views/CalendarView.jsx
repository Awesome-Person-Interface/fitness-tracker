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

  // Triggers the "Create Event" dialog and passes the date slot event object to the dialog
  const handleSelectSlot = useCallback((event) => {
    /*
      Date Slot Event Shape:
      {
        action: "click" or "select" (if dragged),

        // Only one of these two is defined:
        bound: (positions if dragging to select dates),
        box: (position if clicking one date),

        start: Date
        end: Date
        slots: (The start dates of every slot picked)
      }
    */
    setDateSlot(event);
  }, [setDateSlot]);

  /*
    Triggers the EventDetails component to appear to the left of the calendar:
      - Sets the selectedEvent state to the object from the Database
  */
  const handleSelectEvent = useCallback((event) => {
    // Event matches the object stored in the database.
    setSelectedEvent(event);
  }, [setSelectedEvent]);

  /*
    - Sets the starting view date for the calendar
    - 
  */
  const { defaultDate, scrollToTime } = useMemo(() => ({
    defaultDate: dayjs(Date.now()).$d,
    scrollToTime: dayjs(new Date(1970, 1, 1, 6)).$d,
  }), []);

  // Closes the CreateEventDialog, but setting dateSlot state to an empty object
  const handleCloseDialog = () => {
    setDateSlot({});
  };

  // Removes the EventDetails component from view by setting selectedEvent state to null
  const handleSelectEventClose = () => {
    setSelectedEvent(null);
  };

  // Fetches all events for the user from the database
  const getEvents = () => {
    axios.get('/user/events')
      // Success, set events state to the data from the response
      .then(({ data }) => {
        setEvents(data);
      })
      // Failure, log the error
      .catch((err) => {
        console.error('Failed to getEvents:', err);
      });
  };

  const changeSelectedEvent = (event) => {
    setSelectedEvent(event);
  };

  // On component mount, retrieve all events for the user to populate the calendar
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
                <EventDetails
                  selectedEvent={selectedEvent}
                  handleSelectEventClose={handleSelectEventClose}
                  getEvents={getEvents}
                  changeSelectedEvent={changeSelectedEvent}
                />
              ) : (
                <div>No event selected</div>
              )
          }
        </Grid>
        <Grid size={8}>
          <Calendar
            // Sets the default date for the calender view to start at
            defaultDate={defaultDate}

            /*
              Sets the view for the calendar to start at:
                - MONTH
                - WEEK
                - DAY
                - AGENDA
            */
            defaultView={Views.MONTH}

            /*
              Must be an array of event objects with the following keys:
                - title: String
                - start: Date
                - end: Date
                - allDay: Boolean
              Other data can be stored on these objects as well.
            */
            events={events}

            // Set up with the day.js localizer
            localizer={djLocalizer}

            // Converts each event's start and end to the proper format for the calendar.
            startAccessor={(event) => new Date(event.start)}
            endAccessor={(event) => new Date(event.end)}

            // Handlers for selecting an Event or a Slot
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}

            // Makes the calendar selectable
            selectable

            // Should limit the how far back the calendar can scroll
            scrollToTime={scrollToTime}

            // Must set a minHeight for the calendar events to be visible
            style={{
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
