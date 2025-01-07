import React from 'react';

function AccountPage() {
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <IconButton onClick={handleThemeChange} color="inherit">
        <Brightness4Icon />
      </IconButton>
			<div id="root-app">
				<Navigation updateView={updateView}/>
				<br></br>
				<div><AccountPage state={darkMode} user={user} updateView={updateView} fetchUser={fetchUser}/></div>
			</div>
    </ThemeProvider>
  );
}

export default AccountPage;
