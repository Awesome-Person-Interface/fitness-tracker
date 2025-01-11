import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

import EventForm from './EventForm.jsx';

function UpdateEventDialog({
  openUpdateEventDialog,
  handleUpdateEventDialogClose,
  eventDetails,
  getEvents,
  changeSelectedEvent,
}) {
  return (
    <Dialog
      open={openUpdateEventDialog}
      onClose={handleUpdateEventDialogClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>Update Event</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill out the form below to update an event:</DialogContentText>
          <br></br>
          <EventForm
            eventDetails={eventDetails}
            update={true}
            getEvents={getEvents}
            handleCloseDialog={handleUpdateEventDialogClose}
            changeSelectedEvent={changeSelectedEvent}
          />
        </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpdateEventDialogClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateEventDialog;
