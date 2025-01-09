import React from 'react';
import dayjs from 'dayjs';
import {
  Container,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function EventDetails({ selectedEvent, handleSelectEventClose }) {
  const {
    title,
    start,
    end,
    allDay,
    desc,
    category,
  } = selectedEvent;
  return (
    <Container
      sx={{
        pt: 2,
        pb: 2,
        border: 1,
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 3,
      }}
    >
      <Stack>
        <Grid container spacing={2}>
          <Grid size={10}>
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid size={2}>
            <IconButton
              onClick={handleSelectEventClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="subtitle1">{`Date: ${dayjs(start).format('MMMM D[,] YYYY')}`}</Typography>
        <Typography variant="subtitle1">{`Time: ${dayjs(start).format('h:mm A')} - ${dayjs(end).format('h:mm A')}`}</Typography>
        <Typography variant="subtitle1">{`Category: ${category}`}</Typography>
        <br></br>
        <Typography variant="subtitle1">Description:</Typography>
        <Typography variant="subtitle2">{desc}</Typography>
        <br></br>
        <Grid container spacing={2}>
          <Grid size={6}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid size={6}>
            <IconButton>
              <DeleteForeverIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

export default EventDetails;
