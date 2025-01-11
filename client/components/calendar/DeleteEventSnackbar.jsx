import React from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';

function DeleteEventSnackbar({
  successDeleteEvent,
  handleSuccessDeleteEventClose,
}) {
  return (
    <Snackbar
      open={successDeleteEvent}
      onClose={handleSuccessDeleteEventClose}
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={handleSuccessDeleteEventClose}
        severity="success"
      >
        Event removed from your calendar.
      </Alert>
    </Snackbar>
  );
}

export default DeleteEventSnackbar;
