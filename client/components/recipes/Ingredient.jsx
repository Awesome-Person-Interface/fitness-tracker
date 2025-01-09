import React from 'react';
import axios from 'axios';
import {
  Checkbox,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

function Ingredient({ amount, unit, name }) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Checkbox />
        <Typography
        >{`${amount} ${unit} ${name}`}</Typography>
      </Stack>
        <Divider />
    </>

  )
};

export default Ingredient;
