import React from 'react';

function Pantry() {
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <IconButton onClick={handleThemeChange} color="inherit">
        <Brightness4Icon />
      </IconButton>
			<div id="root-app">
				<Navigation updateView={updateView}/>

				<br></br>
				<div><Nutrition state={darkMode} fetchUser={fetchUser} user={user} routines={routines}/></div>

			</div>
    </ThemeProvider>
  );
}

export default Pantry;
