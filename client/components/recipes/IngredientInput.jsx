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
  // Function to handle changes in ingredient fields
  const handleIngredientChange = (element) => {
    // Grab the value from the element
    const { value } = element.target
    // Make a copy of formValues
    const formCopy = { ...formValues };
    // On the formCopy ingredients property
      // Change the name property on the ingredient object at the current index (index comes from state)
    formCopy.ingredients[index].name = value;
    // Set the formValues in state to new value
    setFormValues(formCopy);
  }
  console.log('FormValues: ', formValues);
  return (
  <Grid container spacing={1}>
    <Grid>
      <TextField
        label="Amount"
        />
    </Grid>
    <Grid>
    <InputLabel>
      <Select value={''}>
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
      <TextField
      label="Ingredient"
      onChange={handleIngredientChange}
      value={value}
      />
    </Grid>
  </Grid>
  )
};

export default IngredientInput;
