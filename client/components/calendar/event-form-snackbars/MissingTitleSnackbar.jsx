import React from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';

function MissingTitleSnackbar({
  titleMissing,
  handleTitleMissingClose,
}) {
  return (
    <Snackbar
      open={titleMissing}
      onClose={handleTitleMissingClose}
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={handleTitleMissingClose}
        severity="error"
      >
        Please fill in the title.
      </Alert>
    </Snackbar>
  );
}

export default MissingTitleSnackbar;
