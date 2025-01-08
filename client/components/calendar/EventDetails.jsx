import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

function EventDetails({ selectedEvent }) {
  return (
    <Box>
      <Typography variant="subtitle1">{`Title: ${selectedEvent.title}`}</Typography>
      <Typography variant="subtitle1">{`Start: ${selectedEvent.start}`}</Typography>
      <Typography variant="subtitle1">{`End: ${selectedEvent.end}`}</Typography>
      <Typography variant="subtitle1">{`All Day?: ${selectedEvent.allDay}`}</Typography>
      <Typography variant="subtitle1">{`Description: ${selectedEvent.desc}`}</Typography>
      <Typography variant="subtitle1">{`Category: ${selectedEvent.category}`}</Typography>
    </Box>
  );
}

export default EventDetails;
