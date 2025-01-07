import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { IconButton, Stack } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import useStyles from '../styles';
import AccountMenu from './AccountMenu.jsx';

function Navigation(props) {

  const nav_classes = useStyles();

  return (
    <AppBar position="static" >
      <Container maxWidth="100%" className={nav_classes.navBar}>
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Stack
            sx={{display: 'flex', flexDirection: 'row'}}
            direction="row"
            spacing={4}
          >
            <img src='https://i.imgur.com/ZX5wc9L.png' style={{width: "20%", height: "20%"}}/>
            <Button
              className={nav_classes.navButtons}
              sx={{color: 'white'}}
              component={Link}
              to="/homepage"
            >
              Home
            </Button>
            <Button
              className={nav_classes.navButtons}
              sx={{color: 'white'}}
              component={Link}
              to="/workouts"
            >
              Workouts
            </Button>
            <Button
              className={nav_classes.navButtons}
              sx={{color: 'white'}}
              component={Link}
              to="/exercises"
            >
              Exercises
            </Button>
            <Button
              className={nav_classes.navButtons}
              sx={{color: 'white'}}
              component={Link}
              to="/exercises-search"
            >
              Search Exercises
            </Button>
            <Button
              className={nav_classes.navButtons}
              sx={{color: 'white'}}
              component={Link}
              to="/pantry"
            >
              Pantry
            </Button>
            <Button
              className={nav_classes.navButtons}
              sx={{color: 'white'}}
              component={Link}
              to="/meal-plans"
            >
              Meal Plans
            </Button>
          </Stack>
          <Container>
            <IconButton onClick={props.handleThemeChange} color="inherit">
              <Brightness4Icon />
            </IconButton>
          </Container>
          <Container sx={{justifyItems: "right"}}>
              <AccountMenu />
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;