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
    <ListItem disableGutters disablePadding>
      <Typography>{`${capitalName}: ${Math.ceil(amount)} ${unit}`}</Typography>
    </ListItem>
  )
};

export default Nutrient;
