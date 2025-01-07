import React from 'react';

function Dashboard() {
 return (
  <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <CssBaseline />
    <IconButton onClick={handleThemeChange} color="inherit">
      <Brightness4Icon />
    </IconButton>
    <div id="root-app">
      <Navigation updateView={updateView}/>
      {user ?
      <div>
        <Dashboard user={user}/>
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
}

export default Dashboard;
