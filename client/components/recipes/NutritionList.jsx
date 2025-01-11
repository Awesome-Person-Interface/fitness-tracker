import React from 'react';
import axios from 'axios';
import {
  Box,
} from '@mui/material';
import Nutrient from './Nutrient.jsx';

function NutritionList({ nutrition }) {
  return (
    <Box>
      {nutrition.map((nutrient) => {
        return (
          <Nutrient
            key={nutrient._id}
            name={nutrient.name}
            amount={nutrient.amount}
            unit={nutrient.unit}
          />
        )
      })}
    </Box>
  )
};

export default NutritionList;

// {nutrition.map((nutrient) => {
//   <Nutrient
//     key={nutrient._id}
//     nutrient={nutrient}
//   />
// })}