import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Select,
  MenuItem,
} from '@mui/material';

function RecipeOptions({
  changeTitle,
  changeDesc,
}) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({ name: 'Recipe Name?'});

  const getRecipes = () => {
    axios.get('/user/routines/all')
    .then(({ data }) => {
      setRecipes(data);
    })
    .catch((err) => {
      console.log('Failed to getRecipes:', err);
    });
  };

  const handleSelectChange = ({ target }) => {
    setSelectedRecipe(target.value);

    // Title:
    changeTitle(target.value.name);

    // Description:
    let description = 'Exercises in your workout:';
    target.value.exercises.forEach((exercise) => {
      description += `\n- ${exercise.name}`;
    });
    changeDesc(description);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  console.log('State:', {
    selectedRecipe,
  });

  return (
    <Select
      value={selectedRecipe}
      label="Recipe Name"
      onChange={handleSelectChange}
      renderValue={(value) => value.name}
    >
      {
        recipes.map((recipe) => (
          <MenuItem
            key={recipe._id}
            value={recipe}
          >
            {recipe.name}
          </MenuItem>
        ))
      }
    </Select>
  );
}

export default RecipeOptions;
