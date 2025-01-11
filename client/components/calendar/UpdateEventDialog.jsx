import React from 'react';
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

function UpdateEventDialog({
  openUpdateEventDialog,
  handleUpdateEventDialogClose,
  eventDetails,
  getEvents,
  changeSelectedEvent,
  handleSuccessUpdateEventSnackbarOpen,
}) {
  return (
    <Dialog
      open={openUpdateEventDialog}
      onClose={handleUpdateEventDialogClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>
        <Grid container spacing={2}>
          <Grid size={11}>
            Update Event
          </Grid>
          <Grid size={1}>
            <IconButton
              onClick={handleUpdateEventDialogClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Fill out the form below to update an event:</DialogContentText>
        <br></br>
        <EventForm
          eventDetails={eventDetails}
          update={true}
          getEvents={getEvents}
          handleCloseDialog={handleUpdateEventDialogClose}
          changeSelectedEvent={changeSelectedEvent}
          handleSuccessUpdateEventSnackbarOpen={handleSuccessUpdateEventSnackbarOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateEventDialog;
