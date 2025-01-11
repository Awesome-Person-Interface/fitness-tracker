import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Select,
  MenuItem,
} from '@mui/material';

function WorkoutOptions({
  changeTitle,
  changeDesc,
}) {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState({ routine_name: 'Workout Name?'});

  const getWorkouts = () => {
    axios.get('/user/routines/all')
    .then(({ data }) => {
      setWorkouts(data);
    })
    .catch((err) => {
      console.error('Failed to getWorkouts:', err);
    });
  };

  const handleSelectChange = ({ target }) => {
    setSelectedWorkout(target.value);
    changeTitle(target.value.routine_name);
    let description = 'Exercises in your workout:';
    target.value.exercises.forEach((exercise) => {
      description += `\n- ${exercise.name}`;
    });
    changeDesc(description);
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <Select
      value={selectedWorkout}
      label="Workout Name"
      onChange={handleSelectChange}
      renderValue={(value) => value.routine_name}
    >
      {
        workouts.map((workout) => (
          <MenuItem
            key={workout._id}
            value={workout}
          >
            {workout.routine_name}
          </MenuItem>
        ))
      }
    </Select>
  );
}

export default WorkoutOptions;
