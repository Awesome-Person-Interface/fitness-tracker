import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Select,
  MenuItem,
} from '@mui/material';

function GoalOptions({
  changeTitle,
  changeDesc,
}) {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState({ name: 'Personal Goal?'});

  const getGoals = () => {
    axios.get('/user/info')
    .then(({ data }) => {
      const goalsData = [];

      if (data.goalWeight) {
        goalsData.push({
          name: 'Weight Goal',
          goalTitle: 'Target Weight',
          goalNumber: data.goalWeight,
        });
      }
      
      if (data.goalLiftWeight) {
        goalsData.push({
          name: 'Lift Weight Goal',
          goalTitle: 'Target Lift Weight',
          goalNumber: data.goalLiftWeight,
        });
      }

      if (data.goalSpeed) {
        goalsData.push({
          name: 'Speed Goal',
          goalTitle: 'Target Speed',
          goalNumber: data.goalSpeed,
        });
      }

      setGoals(goalsData);
    })
    .catch((err) => {
      console.error('Failed to getGoals:', err);
    });
  };

  const handleSelectChange = ({ target }) => {
    setSelectedGoal(target.value);
    changeTitle(target.value.name);
    let description = `${target.value.goalTitle}: ${target.value.goalNumber}`;
    changeDesc(description);
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <Select
      value={selectedGoal}
      label="Personal Goal"
      onChange={handleSelectChange}
      renderValue={(value) => value.name}
    >
      {
        goals.map((goal) => (
          <MenuItem
            key={goal.name}
            value={goal}
          >
            {goal.name}
          </MenuItem>
        ))
      }
    </Select>
  );
}

export default GoalOptions;
