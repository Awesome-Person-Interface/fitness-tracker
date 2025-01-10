import React from 'react';
import axios from 'axios';
import {
  ListItem,
  Typography,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

function Nutrient({ name, amount, unit }) {
  const capitalName = name[0].toUpperCase() + name.slice(1);
  return (
    <Grid size={12}>
    <ListItem disableGutters disablePadding>
      <Typography>{`${capitalName}: ${amount} ${unit}`}</Typography>
    </ListItem>
    <Grid size={12}>
      <Divider />
    </Grid>
    </Grid>
  )
};

export default Nutrient;
