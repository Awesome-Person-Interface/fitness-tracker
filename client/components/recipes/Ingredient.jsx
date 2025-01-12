import React from 'react';
import axios from 'axios';
import {
  Checkbox,
  ListItem,
  Divider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

function Ingredient({ amount, unit, name }) {
  return (
    <>
      <ListItem disableGutters disablePadding>
        <Checkbox sx={{ color: 'black'}}/>
        <Typography
        >{`${amount} ${unit} ${name}`}
        </Typography>
      </ListItem>
      <Grid size={12}>
        <Divider />
      </Grid>
    </>
  )
};

export default Ingredient;
