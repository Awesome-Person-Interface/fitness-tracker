import React from 'react';
import DashboardWorkouts from './DashboardWorkouts.jsx';
import DashboardMeals from './DashboardMeals.jsx';
import { DateCalendar, LocalizationProvider, AdapterDayjs } from '@mui/x-date-pickers';
import { Divider,
   Grid2,
   Container,
   Box,
   } from '@mui/material';

const Grid = Grid2;
export default function Dashboard(props) {

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
            This is the space for Goals
            {/* <LocalizationProvider
            dateAdapter={AdapterDayjs}
            >

            <DateCalendar>
              
            </DateCalendar>
            </LocalizationProvider> */}
          </Box>
        </Container>
      </Grid>
      <Grid size={6}
    // direction="column"
    alignItems="flex-end"
    justifyContent="space-between"
    >
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