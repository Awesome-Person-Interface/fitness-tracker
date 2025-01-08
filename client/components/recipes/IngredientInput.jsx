import React, { useState } from 'react';
import axios from 'axios';
import {
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function IngredientInput() {
  return (
  <InputLabel>
    <Select>
      <MenuItem>Option1</MenuItem>
      <MenuItem>Option2</MenuItem>
      <MenuItem>Option3</MenuItem>
    </Select>
  </InputLabel>
  )
};

export default IngredientInput;
