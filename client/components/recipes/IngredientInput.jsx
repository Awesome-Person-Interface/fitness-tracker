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
function IngredientInput({ value, index, formValues, setFormValues}) {
  // State value to hold the chosen measurement
  const [measurement, setMeasurement] = useState('');

  // Function to handle changes in ingredient fields
  const handleIngredientChange = (element) => {
    // Grab the value from the element
    const { value } = element.target
    // Make a copy of formValues
    const formCopy = { ...formValues };
    // Push the new value onto the ingredients at the current index
    formCopy.ingredients[index] = value;
    // Set the formValues in state to new value
    setFormValues(formCopy);
  }
  console.log('FormValues: ', formValues);
  return (
  <Grid container spacing={1}>
    <Grid>
      <TextField
        label="Amount"
        value={value}
        onChange={handleIngredientChange}
        />
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
