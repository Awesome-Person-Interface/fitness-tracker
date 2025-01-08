import React from 'react';
import DashboardWorkouts from './DashboardWorkouts.jsx';
import DashboardMeals from './DashboardMeals.jsx';
import { Divider, Grid2, Container, Box } from '@mui/material';

const Grid = Grid2;
export default function Dashboard(props) {

  return (
    <div id="dash_main">
      <h1 style={{textAlign: "center"}}>Dashboard</h1>
    <Grid container
    direction="column"
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
    </div>
  );
}