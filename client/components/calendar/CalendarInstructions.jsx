import React from 'react';
import {
  Container,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function CalendarInstructions() {
  return (
    <Container
      sx={{
        pt: 2,
        pb: 2,
        border: 1,
        borderWidth: 3,
        borderRadius: 3,
      }}
    >
      <Stack>
        <Typography variant="h4">Welcome to your Vitality Calendar</Typography>
        <br></br>
        <Typography variant="h6">To add an event to your calendar:</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle2">
                    - Click a time slot on the calendar
                  </Typography>
                </>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle2">
                    - Drag across multiple time slots to pick a range of time
                  </Typography>
                </>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle2">
                    - In Month View, you will only be able to create all day events
                  </Typography>
                </>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle2">
                    - Switch to the Week of Day view for a time range choice
                  </Typography>
                </>
              }
            />
          </ListItem>
        </List>
        <Typography variant="h6">Click on any event to see details here.</Typography>
      </Stack>
    </Container>
  );
}

export default CalendarInstructions;
