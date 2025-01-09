import React, { useState, useMemo } from 'react';
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

function EventForm({ update, create, eventDetails }) {
  const [start, setStart] = useState(dayjs(eventDetails.start));
  const [end, setEnd] = useState(dayjs(eventDetails.end));
  const [category, setCategory] = useState('Category');
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [allDay, setAllDay] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const { categories } = useMemo(() => ({
      categories: [
        'Workout',
        'Goal',
        'Breakfast',
        'Lunch',
        'Dinner',
      ],
    }), []);

  const handleAllDayToggle = ({ target }) => {
    setAllDay(target.checked);
  };

  const handleMenuOpenClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = ({ target }) => {
    setCategory(target.innerText);
    setAnchorEl(null);
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
            onClick={handleMenuOpenClick}
          >
            {category}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
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
            helperText="Appears On Calendar Tag"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Grid>
        <Grid size={8}>
        <TextField
            required
            label="Description"
            helperText="More details about the event go here."
            multiline
            value={desc}
            onChange={({ target }) => setDesc(target.value)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default EventForm;
