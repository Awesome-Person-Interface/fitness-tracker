import React, { useState } from 'react';
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
   } from '@mui/material';
   import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
   import dayjs from 'dayjs'

const Grid = Grid2;
export default function Dashboard(props) {
  const [ weight, setWeight ] = useState();
  const [ goalWeight, setGoalWeight ] = useState();
/**
 * Adding FormControl must be separate per each input field to avoid visual errors.
 * But I'm currently working on getting the form to the part of the grid I'm specifying.
 */


const handleClick = (e) => {}
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
             onChange={() => setWeight()}
             />
          </label>
          <Button variant="contained"
           type="submit"
            name="submit-weight"
            onClick={handleClick}
            >Set Current Weight</Button>
          </FormControl>
            
          <FormControl>
          <label type="text" htmlFor="goal-weight">Goal Weight:
            <Input type="text"
             name="goal-weight"
             value={goalWeight}
             onChange={() => setGoalWeight()}
             />
          </label>
          <Button variant="contained"
          type="submit"
           name="submit-goal"
           onClick={handleClick}
           >Set Goal Weight</Button>
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