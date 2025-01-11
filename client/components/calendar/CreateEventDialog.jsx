import React from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';

import EventForm from './EventForm.jsx';

function CreateEventDialog({
  dateSlot,
  handleCloseDialog,
  getEvents,
  handleSuccessCreateEventSnackbarOpen,
}) {
  /*
    start: The date at the start of the dateSlot selected
      - Using this key to determine if a date has been selected to open the dialog
  */
  const { start } = dateSlot;
  return (
    <Dialog
      open={!!start}
      onClose={handleCloseDialog}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>
        <Grid container spacing={2}>
          <Grid size={11}>
            Create Event
          </Grid>
          <Grid size={1}>
            <IconButton
              onClick={handleCloseDialog}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      {
        start
          ? (
            <DialogContent>
              <DialogContentText>Fill out the form below to create an event:</DialogContentText>
              <br></br>
              <EventForm
                eventDetails={dateSlot}
                create={true}
                getEvents={getEvents}
                handleCloseDialog={handleCloseDialog}
                handleSuccessCreateEventSnackbarOpen={handleSuccessCreateEventSnackbarOpen}
              />
            </DialogContent>
          )
          : (
            <DialogContent>
              <DialogContentText>Closing...</DialogContentText>
            </DialogContent>
          )
      }
    </Dialog>
  );
}

export default CreateEventDialog;
