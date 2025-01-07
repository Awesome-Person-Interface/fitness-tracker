import React from 'react';

function Exercises() {
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <IconButton onClick={handleThemeChange} color="inherit">
        <Brightness4Icon />
      </IconButton>
			<div id="root-app">
				<Navigation updateView={updateView}/>
				<br></br>
				{user ?
					<div>
				    <WorkoutList user={user} fetchUser={fetchUser} workouts={user.workouts}/>
					</div>
					:
					<div>
						<h1 style={{textAlign:"center"}}>401</h1>
						<h2 style={{textAlign:"center"}}>Unauthorized; please re-attempt login.</h2>
					</div>
				}
			</div>
    </ThemeProvider>
  );
};

export default Exercises;
