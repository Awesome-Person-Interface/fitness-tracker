import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

function DeleteEventDialog({
  openDeleteEventDialog,
  eventTitle,
  handleDeleteEventDialogClose,
}) {
  return (
    <Dialog
      open={openDeleteEventDialog}
      onClose={handleDeleteEventDialogClose}
    >
      <DialogTitle>
        Delete This Event
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to delete the event "${eventTitle}"? This action is permanent and cannot be undone.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDeleteEventDialogClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteEventDialogClose}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteEventDialog;
