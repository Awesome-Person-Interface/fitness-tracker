import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkoutOptions() {
  const [workouts, setWorkouts] = useState([]);

  const getRoutines = () => {
    axios.get('/user/routines/all')
    .then(({ data }) => {
      setWorkouts(data);
    })
    .catch((err) => {
      console.log('Failed to getWorkouts:', err);
    });
  };

  useEffect(() => {
    getRoutines();
  }, []);

  console.log(workouts);

  return (
    <div>Workout Options</div>
  );
}

export default WorkoutOptions;
