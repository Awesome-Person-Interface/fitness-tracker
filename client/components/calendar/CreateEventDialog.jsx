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

function CreateEventDialog({ dateSlot, handleCloseDialog }) {
  /*
    start: The date at the start of the dateSlot selected
    end: The date at the end of the dateSlot selected
      - (Exclusive) Not included in the range shown on the calendar.
  */
  const { start, end } = dateSlot;
  return (
    <Dialog
      open={!!dateSlot.start}
      onClose={handleCloseDialog}
      fullWidth={true}
      maxWidth="lg"
    >
      <DialogTitle>Create Event</DialogTitle>
      {
        dateSlot.start
          ? (
            <DialogContent>
              <DialogContentText>{`Start: ${start}`}</DialogContentText>
              <DialogContentText>{`End: ${end}`}</DialogContentText>
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
