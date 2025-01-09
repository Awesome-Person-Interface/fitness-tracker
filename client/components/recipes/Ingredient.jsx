import React from 'react';
import axios from 'axios';
import {
  Stack,
  Typography,
  Divider,
} from '@mui/material';

function Ingredient({ name }) {
  return (
    <Typography>{name}</Typography>
  )
};

export default Ingredient;
