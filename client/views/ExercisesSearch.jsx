import React from 'react';

function ExercisesSearch() {
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <IconButton onClick={handleThemeChange} color="inherit">
        <Brightness4Icon />
      </IconButton>
      <div id="root-app">
        <Navigation updateView={updateView}/>
        <br></br>
        <div>
          <WorkoutSearch user={user} fetchUser={fetchUser}/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ExercisesSearch;
