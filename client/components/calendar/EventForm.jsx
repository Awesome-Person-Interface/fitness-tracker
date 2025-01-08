import React from 'react';
import Grid from '@mui/material/Grid2';
import {
  Typography,
} from '@mui/material';

function EventForm({ update, create }) {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <Typography variant="subtitle2">Start:</Typography>
      </Grid>
      <Grid size={6}>
      <Typography variant="subtitle2">End:</Typography>
      </Grid>
    </Grid>
  );
}

export default EventForm;
