import React, { useState } from 'react';
import axios from 'axios';
import {
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid2';

const measurements = ['tsp', 'tbsp', 'cups', 'qts', 'oz', 'lbs', 'fl oz' ]
function IngredientInput({ value, index, formValues, setFormValues}) {
  // Function to handle changes in ingredient and amount fields
  const handleIngredientChange = (element) => {
    // Grab the value and the id from the element
      // Id represents the property of the ingredient object to be changed
    const { value, id } = element.target
    // Make a copy of formValues
    const formCopy = { ...formValues };
    // On the formCopy ingredients property
      // Change the property on the ingredient object at the current index (index comes from state)
    formCopy.ingredients[index][id] = value;
    // Set the formValues in state to new value
    setFormValues(formCopy);
  }
  // Function to handle the choice of unit in the select field
  const handleUnitClick = (element) => {
    // Grab the value from the element
    const { value } = element.target.dataset;
    const formCopy = { ...formValues };
    formCopy.ingredients[index].unit = value;
    setFormValues(formCopy);
  }
  // Function to remove ingredient input from the form
  const deleteInput = () => {
    const formCopy = { ...formValues };
    formCopy.ingredients.splice(index, 1);
    setFormValues(formCopy);
  }
  return (
  <Grid>
    <Stack direction="row" spacing={1}>
      <IconButton
        onClick={deleteInput}
      >
        <ClearIcon />
      </IconButton>
      <TextField
        sx={{
          width: 150,
          "& .MuiInputBase-root": {
            height: 50
          }
        }}
        label="Amount"
        id="amount"
        onChange={handleIngredientChange}
        />
      <Select
        sx={{
          width: 80,
          "& .MuiSelect-root": {
            height: 10
          }
        }}
        value={formValues.ingredients[index].unit}
        placeholder="Unit"
        >
        {measurements.map((measurement) => {
          return (
            <MenuItem
              onClick={handleUnitClick}
              key={measurement}
              value={measurement}
              >
                {measurement}
            </MenuItem>
          )
        })}
      </Select>
      <TextField
        sx={{
          width: 150,
          "& .MuiInputBase-root": {
            height: 50
          }
        }}
        label="Ingredient"
        onChange={handleIngredientChange}
        id="name"
        value={value}
      />
      </Stack>
  </Grid>
  )
};

export default IngredientInput;
