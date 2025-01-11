import React, { useState, useMemo, useEffect } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import WorkoutOptions from './event-form-options/WorkoutOptions.jsx';
import RecipeOptions from './event-form-options/RecipeOptions.jsx';
import GoalOptions from './event-form-options/GoalOptions.jsx';

import MissingCatSnackbar from './event-form-snackbars/MissingCatSnackbar.jsx';
import MissingTitleSnackbar from './event-form-snackbars/MissingTitleSnackbar.jsx';
import AlertSnackbar from './AlertSnackbar.jsx';

function EventForm({
  update,
  create,
  eventDetails,
  getEvents,
  handleCloseDialog,
  changeSelectedEvent,
  handleSuccessCreateEventSnackbarOpen,
  handleSuccessUpdateEventSnackbarOpen,
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
  const [category, setCategory] = useState(eventDetails.category ? eventDetails.category : 'Category?');
  const [allDay, setAllDay] = useState(eventDetails.allDay ? eventDetails.allDay : false);
  const [title, setTitle] = useState(eventDetails.title ? eventDetails.title : '');
  const [desc, setDesc] = useState(eventDetails.desc ? eventDetails.desc : '');

  const [disableAllDaySwitch, setDisableAllDaySwitch] = useState(false);

  /*
    Snack Bar Missing States:
      - Determine whether the 
  */
  const [catMissing, setCatMissing] = useState(false);
  const [titleMissing, setTitleMissing] = useState(false);

  const handleCatMissingClose = () => {
    setCatMissing(false);
  };

  const handleTitleMissingClose = () => {
    setTitleMissing(false);
  };

  const { multiDay } = useMemo(() => ({
    multiDay: (new Date(eventDetails.end)) - (new Date(eventDetails.start)) > 86400000
  }), []);

  // Categories used in the dropdown menu
  const { categories } = useMemo(() => ({
      categories: [
        'Workout',
        'Goal',
        'Breakfast',
        'Lunch',
        'Dinner',
        'Custom',
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
    if (category === 'Category?' || title === '') {
      if (category === 'Category?') {
        setCatMissing(true);
      }
      // Check if the Title has been set
      if (title === '') {
        category === 'Category?'
          ? setTimeout(() => { setTitleMissing(true); }, 1500)
          : setTitleMissing(true);
      }
    }

    else {
      // Create the body to send with the axios POST request
      const newEvent = {
        event: {
          title,
          start: start.$d,
          end: end.$d,
          allDay,
          desc,
          category,
        },
      };
      axios.post('/user/events', newEvent)
        // Success, fetch all events for the user & close the dialog menu
        .then(getEvents)
        .then(handleSuccessCreateEventSnackbarOpen)
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

  const patchEvent = () => {
    const updateEvent = {
      event: {
        title,
        start: start.$d,
        end: end.$d,
        allDay,
        desc,
        category,
      },
    };

    axios.patch(`/user/events/${eventDetails._id}`, updateEvent)
      // Success, fetch all events for the user & close the dialog menu
      .then(() => {
        changeSelectedEvent(updateEvent.event);
      })
      .then(handleSuccessUpdateEventSnackbarOpen)
      .then(getEvents)
      .then(handleCloseDialog)
      // Failure, log the error
      .catch((err) => {
        console.error('Failed to patchEvent:', err);
      });
  };

  const handleUpdateClick = () => {
    patchEvent();
  };

  const changeTitle = (title) => {
    setTitle(title);
  };

  const changeDesc = (desc) => {
    setDesc(desc);
  }

  useEffect(() => {
    if (new Date(eventDetails.end) - new Date(eventDetails.start) >= 86400000) {
      setAllDay(true);
      setDisableAllDaySwitch(true);
      setEnd(dayjs(new Date(eventDetails.end) - 1));
    }
  }, []);

  return (
    <>
      <Stack spacing={2}>
          {
            allDay
              ? (
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={multiDay ? 'Start Date' : 'Date'}
                        value={start}
                        onChange={(newTime) => setStart(newTime)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {
                    multiDay
                      ? (
                        <Grid size={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="End Date"
                              value={end}
                              onChange={(newTime) => setEnd(newTime)}
                            />
                          </LocalizationProvider>
                        </Grid>
                      ) : null
                  }
                </Grid>
              )
              : (
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
              )
          }
        <Grid container spacing={2}>
          <Grid size={6}>
            <Button
              variant="contained"
              color={category === 'Category?' ? 'secondary' : 'primary'}
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
                disabled={disableAllDaySwitch}
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
          <Grid size={8}>
            <TextField
              label="Description"
              helperText="More details about the event go here."
              multiline
              fullWidth
              value={desc}
              onChange={({ target }) => setDesc(target.value)}
            />
          </Grid>
        </Grid>
        {
          category === 'Workout'
            ? (
              <WorkoutOptions
                changeTitle={changeTitle}
                changeDesc={changeDesc}
              />
            ) : null
        }

        {
          category === 'Breakfast' || category === 'Lunch' || category === 'Dinner'
            ? (
              <RecipeOptions
                changeTitle={changeTitle}
                changeDesc={changeDesc}
                category={category}
              />
            ) : null
        }

        {
          category === 'Goal'
            ? (
              <GoalOptions
                changeTitle={changeTitle}
                changeDesc={changeDesc}
              />
            ) : null
        }

        {create
          ? (
            <Button
              variant="contained"
              onClick={handleCreateClick}
            >
              Create
            </Button>
          ) : null
        }

        {update
          ? (
            <Button
              variant="contained"
              onClick={handleUpdateClick}
            >
              Update
            </Button>
          ) : null
        }
      </Stack>

      <AlertSnackbar
        open={catMissing}
        handleClose={handleCatMissingClose}
        message="Please select a category."
        severity="error"
      />
      
      <AlertSnackbar
        open={titleMissing}
        handleClose={handleTitleMissingClose}
        message="Please fill in the title."
        severity="error"
      />
    </>
  );
}

export default EventForm;
