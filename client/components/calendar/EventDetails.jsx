import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Container,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import DeleteEventDialog from './DeleteEventDialog.jsx';
import UpdateEventDialog from './UpdateEventDialog.jsx';

function EventDetails({ selectedEvent, handleSelectEventClose, getEvents, changeSelectedEvent }) {
  const {
    _id,
    title,
    start,
    end,
    allDay,
    desc,
    category,
  } = selectedEvent;

  const [openDeleteEventDialog, setOpenDeleteEventDialog] = useState(false);
  const [openUpdateEventDialog, setOpenUpdateEventDialog] = useState(false);

  const deleteEvent = () => {
    axios.delete(`/user/events/${_id}`)
      .then(handleSelectEventClose)
      .then(getEvents)
      .catch((err) => {
        console.error('Failed to deleteEvent:', err);
      })
  }

  const handleDeleteEventDialogOpen = () => {
    setOpenDeleteEventDialog(true);
  };

  const handleDeleteEventDialogClose = () => {
    setOpenDeleteEventDialog(false);
  };

  const handleUpdateEventDialogOpen = () => {
    setOpenUpdateEventDialog(true);
  };

  const handleUpdateEventDialogClose = () => {
    setOpenUpdateEventDialog(false);
  };

  return (
    <Container
      sx={{
        pt: 2,
        pb: 2,
        border: 1,
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 3,
      }}
    >
      <Stack>
        <Grid container spacing={2}>
          <Grid size={10}>
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid size={2}>
            <IconButton
              onClick={handleSelectEventClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="subtitle1">{`Date: ${dayjs(start).format('MMMM D[,] YYYY')}`}</Typography>
        <Typography variant="subtitle1">{`Time: ${dayjs(start).format('h:mm A')} - ${dayjs(end).format('h:mm A')}`}</Typography>
        <Typography variant="subtitle1">{`Category: ${category}`}</Typography>
        <br></br>
        <Typography variant="subtitle1">Description:</Typography>
        <Typography variant="subtitle2">{desc}</Typography>
        <br></br>
        <Grid container spacing={2}>
          <Grid size={6}>
            <IconButton
              onClick={handleUpdateEventDialogOpen}
            >
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid size={6}>
            <IconButton
              onClick={handleDeleteEventDialogOpen}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Stack>
      <DeleteEventDialog
        openDeleteEventDialog={openDeleteEventDialog}
        eventTitle={title}
        handleDeleteEventDialogClose={handleDeleteEventDialogClose}
        deleteEvent={deleteEvent}
      />
      <UpdateEventDialog
        openUpdateEventDialog={openUpdateEventDialog}
        handleUpdateEventDialogClose={handleUpdateEventDialogClose}
        eventDetails={selectedEvent}
        getEvents={getEvents}
        changeSelectedEvent={changeSelectedEvent}
      />
    </Container>
  );
}

export default EventDetails;
