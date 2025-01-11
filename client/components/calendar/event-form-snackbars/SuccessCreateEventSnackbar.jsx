import React from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';

function SuccessCreateEventSnackbar({
  successCreateEvent,
  handleSuccessCreateEventClose,
}) {
  return (
    <Snackbar
      open={successCreateEvent}
      onClose={handleSuccessCreateEventClose}
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={handleSuccessCreateEventClose}
        severity="success"
      >
        Event added to your calendar.
      </Alert>
    </Snackbar>
  );
}

export default SuccessCreateEventSnackbar;
