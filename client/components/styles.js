import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
//Hook to call styling for useStyles instance
//Below we can define specific stylings to call later in other components
const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    overflowX: 'auto',
    flexDirection: 'row',
    gap: '10px',
    padding: '50px',
    boxSizing: 'border-box',
    alignItems: 'center',
  },
  box4Routines: {
    display: 'flex',
    overflowX: 'auto',
    flexDirection: 'row',
    gap: '10px',
    padding: '50px',
    boxSizing: 'border-box',
    alignItems: 'center',
  },
  workouts: {
    minHeight: '300px',
    maxHeight: '100%',
    overflowY: 'auto',
    minWidth: '300px',
    maxWidth: '300px',
    padding: '20px',
    background: 'linear-gradient(45deg, #556270 30%, #FF6B6B 90%)',
    boxSizing: 'border-box',
    position: 'relative',
    flexDirection: 'column',
    borderRadius: '10px'
  },
  workoutSaved: {
    flex: 'auto',
    display: 'flex',
    maxHeight: '100%',
    overflowX: 'auto',
    minWidth: '300px',
    maxWidth: '500px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
    background: 'linear-gradient(45deg, #556270 30%, #FF6B6B 90%)',
    boxSizing: 'border-box',
    position: 'relative',
    flexDirection: 'column',
    borderRadius: '10px',
    justifyItems: 'right',
  },
  workoutSelected: {
    flex: '250px',
    display: '250px',
    minHeight: '300px',
    maxHeight: '100%',
    paddingTop: '10px',
    marginBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    background: 'linear-gradient(45deg, #556270 30%, #FF6B6B 90%)',
    boxSizing: 'border-box',
    position: 'relative',
    flexDirection: 'column',
    borderRadius: '10px',
    justifyItems: 'center',
  },
  iconButton: {
    height: '30px',
    position: 'relative',
    right: '30px',
    top: '30px',
    width: '20px',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: 'rgba(211, 211, 211, 0.3)' },
    "&:active": {
      transform: "scale(0.98)",
    }
  },
  routineAdd: {
    color: 'black',
    background: 'linear-gradient(135deg, #556270 30%, #FF6B6B 90%)',
    backgroundColor: 'transparent',
    '&:hover': { background: 'linear-gradient(0deg, #556270 30%, #FF6B6B 90%)' },
    "&:active": {
      transform: "scale(0.98)",
    }
  },
  text: {
    fontFamily: 'Roboto, sans serif',
    fontSize: '1.2rem',
  },
  addButton: {
    transform: 'scale(.825)',
    justifyContent: 'right',
    height: '30px',
    position: 'fixed',
    right: '-200px',
    top: '-10px',
    borderRadius: '10px',
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    '&:hover': { backgroundColor: 'rgba(211, 211, 211, 0.3)' },
    "&:active": {
      transform: "scale(0.98)"
    }
  },
  navBar: {
    background: '#2e3067',
  },
  navButtons: {
    whiteSpace: 'wrap',
    margin: '0 15px',
    minWidth: '125px',
    padding: '8px 15px',
    textAlign: 'center',
    '&:hover': { backgroundColor: 'rgba(211, 211, 211, 0.3)' },
    "&:active": {
      transform: "scale(0.98)",
    }
  },
  navAccountOptions: {
    justifyItems: "right",
    alignContent: "right",
    justifyContent: "right",
    alignItems: "right",
    alignSelf: "right"
  },
  deleteAccButton: {
    background: 'linear-gradient(45deg, #e52d27 30%, #b31217 90%)',
    '&:hover': { backgroundColor: 'rgba(211, 211, 211, 0.3)' },
    "&:active": {
      transform: "scale(0.98)",
    }
  }
}));

//theme style
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#353839',
      paper: '#353839',
    },
    primary: {
      main: '#353839',
    },
    secondary: {
      main: '#353839',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#A7C0FB',
      paper: '#FAF0E6',
    },
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    }
  }
});

export default useStyles;