import React from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

import EventForm from './EventForm.jsx';

function CreateEventDialog({ dateSlot, handleCloseDialog, getEvents }) {
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
      <DialogTitle>Create Event</DialogTitle>
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
              />
            </DialogContent>
          )
          : (
            <DialogContent>
              <DialogContentText>Closing...</DialogContentText>
            </DialogContent>
          )
      }

      <DialogActions>
        <Button
          onClick={handleCloseDialog}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateEventDialog;
