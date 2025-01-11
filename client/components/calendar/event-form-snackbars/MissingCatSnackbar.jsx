import React from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';

function MissingCatSnackbar({
  catMissing,
  handleCatMissingClose,
}) {
  return (
    <Snackbar
      open={catMissing}
      onClose={handleCatMissingClose}
      autoHideDuration={1500}
    >
      <Alert
        onClose={handleCatMissingClose}
        severity="error"
      >
        Please select a category.
      </Alert>
    </Snackbar>
  );
}

export default MissingCatSnackbar;
