import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Typography,
  Stack,
  Switch,
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
  const [allDay, setAllDay] = useState(false);

  const handleAllDayToggle = ({ target }) => {
    setAllDay(target.checked);
  };

  console.log(allDay);

  return (
    <Stack spacing={2}>
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
      <Grid container spacing={2}>
        <Grid size={6}>

        </Grid>
        <Grid size={6}>
          <Typography variant="subtitle2">All Day Event?</Typography>
          <Switch
            checked={allDay}
            onChange={handleAllDayToggle}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default EventForm;
