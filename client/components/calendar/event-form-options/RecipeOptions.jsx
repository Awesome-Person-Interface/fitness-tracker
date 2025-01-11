import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Select,
  MenuItem,
} from '@mui/material';

function RecipeOptions({
  changeTitle,
  changeDesc,
  category,
}) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({ name: 'Recipe Name?'});

  const getRecipes = () => {
    axios.get('/user/recipes')
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
    changeTitle(`${category}: ${target.value.name}`);

    // Description:
    let description = 'Ingredients in your recipe:';
    target.value.ingredients.forEach((ingredient) => {
      description += `\n- ${ingredient.amount} ${ingredient.unit} ${ingredient.name} `;
    });
    description += `\n\nNotes:\n${target.value.notes}`;
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
