import React from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

function CreateEventDialog({ openDialog, handleCloseDialog }) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
    >
      <DialogTitle>Create Event</DialogTitle>
    </Dialog>
  );
}

export default CreateEventDialog;
