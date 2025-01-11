import React from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';

function AlertSnackbar({
  open,
  handleClose,
  message,
  severity,
}) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertSnackbar;
