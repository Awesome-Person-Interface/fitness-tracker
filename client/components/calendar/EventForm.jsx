import React, { useState, useMemo } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import {
  Typography,
  Stack,
  Switch,
  Button,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function EventForm({
  update,
  create,
  eventDetails,
  getEvents,
  handleCloseDialog,
}) {
  // State 
  const [catMenuAnchorEl, setCatMenuAnchorEl] = useState(null);
  const catMenuOpen = Boolean(catMenuAnchorEl);

  /*
    State tracking the fields in the form:
      - start -> Date in the dayjs format
      - end -> Date in the dayjs format
      - category -> String
      - allDay -> Boolean
      - title -> String
      - desc -> String
  */
  const [start, setStart] = useState(dayjs(eventDetails.start));
  const [end, setEnd] = useState(dayjs(eventDetails.end));
  const [category, setCategory] = useState('Category');
  const [allDay, setAllDay] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // Categories used in the dropdown menu
  const { categories } = useMemo(() => ({
      categories: [
        'Workout',
        'Goal',
        'Breakfast',
        'Lunch',
        'Dinner',
      ],
    }), []);

  // Handles the toggling of the allDay switch
  const handleAllDayToggle = ({ target }) => {
    setAllDay(target.checked);
  };

  // Handles clicking to open the category menu
  const handleCatMenuOpenClick = ({ currentTarget }) => {
    setCatMenuAnchorEl(currentTarget);
  };

  // Handles the event of the category menu closing
  const handleCatMenuClose = () => {
    setCatMenuAnchorEl(null);
  };

  // Handles changing the category state and closing the category menu
  const handleCategoryChange = ({ target }) => {
    setCategory(target.innerText);
    setCatMenuAnchorEl(null);
  };

  // Sends a POST request to create an Event object in the Database
  const postEvent = () => {
    // Check if the category has been selected
    if (category === 'Category') {
      return;
    }
    // Check if the Title has been set
    else if (title === '') {
      return;
    }

    else {
      // Create the body to send with the axios POST request
      const body = {
        event: {
          title,
          start: start.$d,
          end: end.$d,
          allDay,
          desc,
          category,
        },
      };
      axios.post('/user/events', body)
        // Success, fetch all events for the user & close the dialog menu
        .then(getEvents)
        .then(handleCloseDialog)
        // Failure, log the error
        .catch((err) => {
          console.error('Failed to postEvent:', err);
        });
    }
  };

  // Handles the create button click to POST event data
  const handleCreateClick = () => {
    postEvent();
  };

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={start}
              onChange={(newTime) => setStart(newTime)}
              disabled={allDay}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End Time"
              value={end}
              onChange={(newTime) => setEnd(newTime)}
              disabled={allDay}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Button
            variant="contained"
            onClick={handleCatMenuOpenClick}
          >
            {category}
          </Button>
          <Menu
            anchorEl={catMenuAnchorEl}
            open={catMenuOpen}
            onClose={handleCatMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {
              categories.map((category) => (
                <MenuItem
                  key={category}
                  onClick={handleCategoryChange}
                >
                  {category}
                </MenuItem>
              ))
            }
          </Menu>
        </Grid>
        <Grid size={6}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Switch
              checked={allDay}
              onChange={handleAllDayToggle}
            />
            <Typography>All Day?</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={4}>
          <TextField
            required
            label="Title"
            helperText="Short Calendar Tag"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Description"
            helperText="More details about the event go here."
            multiline
            fullWidth
            value={desc}
            onChange={({ target }) => setDesc(target.value)}
          />
        </Grid>
        <Grid size={2}>
            {create
              ? (
                <Button
                  onClick={handleCreateClick}
                >
                  Create
                </Button>
              ) : null
            }
        </Grid>
      </Grid>
    </Stack>
  );
}

export default EventForm;
