import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import Navigation from '../components/navigation/Navigation.jsx';

const localizer = dayjsLocalizer(dayjs);

function CalendarView({ handleThemeChange }) {
  return (
    <div id="root-app">
      <Navigation handleThemeChange={handleThemeChange} />
      <br></br>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default CalendarView;
