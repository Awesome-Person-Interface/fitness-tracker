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

function UpdateEventDialog({ openUpdateEventDialog, handleCloseUpdateEventDialog, eventDetails }) {
  return (
    <Dialog
      open={openUpdateEventDialog}
      onClose={handleCloseUpdateEventDialog}
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
            handleCloseUpdateEventDialog={handleCloseUpdateEventDialog}
          />
        </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseUpdateEventDialog}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateEventDialog;
