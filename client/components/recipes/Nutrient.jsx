import React from 'react';
import {
  ListItem,
  Typography,
} from '@mui/material';



function Nutrient({ name, amount, unit }) {
  const capitalName = name[0].toUpperCase() + name.slice(1);
  return (
    <ListItem disableGutters disablePadding>
      <Typography
        sx={{ fontWeight: 600 }}
      >{`${capitalName}: ${Math.ceil(amount)} ${unit}`}</Typography>
    </ListItem>
  )
};

export default Nutrient;
