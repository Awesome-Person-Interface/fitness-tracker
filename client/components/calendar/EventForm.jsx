import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Typography,
} from '@mui/material';
import {
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function EventForm({ update, create, eventDetails }) {
  const [start, setStart] = useState(dayjs(eventDetails.start));
  const [end, setEnd] = useState(dayjs(eventDetails.end));
  console.log('Start:', start);
  console.log('End:', end);
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={start}
            onChange={(newTime) => setStart(newTime)}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="End Time"
            value={end}
            onChange={(newTime) => setEnd(newTime)}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

export default EventForm;
