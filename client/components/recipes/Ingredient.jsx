import React from 'react';
import axios from 'axios';
import {
  Checkbox,
  ListItem,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

function Ingredient({ amount, unit, name }) {
  return (
    <Grid size={12}>
    <ListItem disableGutters disablePadding>
      <Checkbox />
      <Typography
      >{`${amount} ${unit} ${name}`}</Typography>
    </ListItem>
    <Grid size={12}>
      <Divider />
    </Grid>
    </Grid>
  )
};

export default Ingredient;
