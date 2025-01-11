import React from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';

function SuccessUpdateEventSnackbar({
  successUpdateEvent,
  handleSuccessUpdateEventClose,
}) {
  return (
    <Snackbar
      open={successUpdateEvent}
      onClose={handleSuccessUpdateEventClose}
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={handleSuccessUpdateEventClose}
        severity="success"
      >
        Event updated in your calendar.
      </Alert>
    </Snackbar>
  );
}

export default SuccessUpdateEventSnackbar;
