import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

const measurements = ['tsp', 'tbsp', 'cup', 'oz', 'fl oz' ]
function IngredientInput() {
  // State value to hold the chosen measurement
  const [measurement, setMeasurement] = useState('');
  return (
  <Grid container spacing={1}>
    <Grid>
      <TextField label="Amount" />
    </Grid>
    <Grid>
    <InputLabel>
      <Select value={measurement}>
        {measurements.map((measurement) => {
          return (
            <MenuItem
              key={measurement}
              value={measurement}
              >
                {measurement}
            </MenuItem>
          )
        })}
      </Select>
    </InputLabel>
    </Grid>
    <Grid>
      <TextField label="Ingredient" />
    </Grid>
  </Grid>
  )
};

export default IngredientInput;
