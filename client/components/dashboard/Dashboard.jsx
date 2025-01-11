import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardWorkouts from './DashboardWorkouts.jsx';
import DashboardMeals from './DashboardMeals.jsx';
import { DateCalendar,
   LocalizationProvider,
  DemoContainer,
  DatePicker,

 } from '@mui/x-date-pickers';
import { Divider,
   Grid2,
   Container,
   Box,
   FormControl,
   InputLabel,
   Input,
   FormHelperText,
   Button,
   Typography,
   } from '@mui/material';
   import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
   import dayjs from 'dayjs'

const Grid = Grid2;
export default function Dashboard(props) {
  // weight and goal weight are set to state to hold the info in the forms before submitting them to the db
  const [ weight, setWeight ] = useState('');
  const [ goalWeight, setGoalWeight ] = useState('');
  // dbWeight and dbGoal are set to get the info straight from the database after a submission has occurred
  const [ dbWeight, setDbWeight ] = useState('');
  const [ dbGoalWeight, setDbGoalWeight ] = useState('');
/**
 * Adding FormControl must be separate per each input field to avoid visual errors.
 * But I'm currently working on getting the form to the part of the grid I'm specifying.
 */

// create a get function for rerendering the user info after changes
//if there's a goal entered in, render the reader of that info. Otherwise, render as normal
const getUserGoals = () => {
  axios.get('/user/info')
  .then(({ data }) => {
    console.log(data.weight);
    if(data.weight !== null){
      setDbWeight(data.weight);
    };
    if(data.goalWeight !== null){
      setDbGoalWeight(data.goalWeight);
    };

  })
  .catch((err) => {
    console.error('Could not GET goals', err)
  });
}
useEffect(() => {
  getUserGoals
}, []);
const updateGoals = () => {
  // set an object with groups as the property and an object as its value
  let req = {
    goals: {}
  }
  // if there are changes entered in state for weight
  if (weight !== '') {
    // take the weight from state and add it to the request object
    req.goals.weight = weight;
  };
  // if there are changes entered in state for goal weight
  if (goalWeight !== '') {
    // take the goal weight from state and add it to the request object
    req.goals.goalWeight = goalWeight;
  };
  //.then  send a get request for the user
  // .then Take the values from the database and populate the goals section.
  // set a value to hold the necessary form for entering info into the database
  axios.patch('/user/goals', req)
  .then(() => {
    // if after the patch, the weight (& l8r goalWeight) is(are) populated in the Schema,
    // tie each value to its corresponding db state
    getUserGoals();
  }).catch((err) =>
  console.log('Could not patch goals', err)
);
}

  return (
    <div id="dash_main">
      <h1 style={{textAlign: "center"}}>Dashboard</h1>
    <Grid container spacing={2}>
      <Grid size={5}
      // direction="column"
      alignItems="flex-end"
      justifyContent="space-between"
      >
        <Container>
          <Box>
            This is the space for Calendar/Goals
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar>
              
            </DateCalendar>
            </LocalizationProvider>
          </Box>
        </Container>
      </Grid>
      <Grid>
        <Container>
          <Box>
            {dbWeight ?
            <Typography variant="h5">Yo weight: {dbWeight}lbs</Typography>
          :
          null
          }
          {dbGoalWeight ?
              <Typography variant="h5">Yo goal: {dbGoalWeight}lbs </Typography>
            :
            null
            }
          </Box>
        </Container>
      </Grid>
      <Grid size={6}
    alignItems="flex-end"
    justifyContent="space-between"
    >

      {/* <Container> */}

      <Grid size={5} justifyContent="space-between" alignItems="flex">
        <FormControl variant="outlined" size="small">
          <label htmlFor="current-weight">Current Weight:
            <Input type="text"
             name="current-weight"
             value={weight}
             onChange={() => setWeight(event.target.value)}
             />
          </label>
          {/* <Button variant="contained"
           type="submit"
            name="submit-weight"
            onClick={updateGoals}
            >Set Current Weight</Button> */}
          </FormControl>
            
          <FormControl>
          <label type="text" htmlFor="goal-weight">Goal Weight:
            <Input type="text"
             name="goal-weight"
             value={goalWeight}
             onChange={() => setGoalWeight(event.target.value)}
             />
          </label>
          <Button variant="contained"
          type="submit"
           name="submit-goal"
           onClick={updateGoals}
           >Set User Info</Button>
        </FormControl>
        {/* </Container> */}
      </Grid>
      <Grid size={5}
      alignItems="flex"
      justifyContent="space-between"
      >
      </Grid>
      <Divider/>
      <div id="dash_container" style={{display: "flex", flexDirection: "column", paddingTop: "35px", justifyContent: "center"}}>
        <div id="dash_workouts" style={{paddingRight:"20px"}}>
          <DashboardWorkouts workouts={props.user.workouts}/>
        </div>
        <div id="dash_meals">
          <DashboardMeals nutrition={props.user.nutrition}/>
        </div>
      </div>
    </Grid>
    </Grid>
    </div>
  );
}