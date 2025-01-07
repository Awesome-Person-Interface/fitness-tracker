import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';

// Views:
import Account from './views/Account.jsx';
import Home from './views/Home.jsx';
import Exercises from './views/Exercises.jsx';
import ExercisesSearch from './views/ExercisesSearch.jsx';
import Login from './views/Login.jsx';
import MealPlans from './views/MealPlans.jsx';
import Pantry from './views/Pantry.jsx';
import Workouts from './views/Workouts.jsx';

import { ThemeProvider, CssBaseline, Switch, IconButton } from '@mui/material';
import { lightTheme, darkTheme } from './components/styles.js';
import Brightness4Icon from '@mui/icons-material/Brightness4';



export default function App() {
  //theme toggle light/dark
  const [darkMode, setDarkMode] = useState(false);
	const [user, setUser] = useState(null);
	const [routines, setRoutines] = useState(null);

	function fetchUser() {
		axios.get(`/user/info/`)
		  .then((userData) => {
				setUser(userData.data)
		  })
		  .catch((err) => {
				console.error('Failed to get userData');
		  })

		axios.get(`/user/routines/all`)
			.then((userRoutines) => {
				setRoutines(userRoutines.data)
			})
			.catch((err) => {
				console.error('Failed to fetch userRoutines.')
			})
	}

  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

	useEffect(() => {
		document.title = 'Vitality';
		setTimeout( () => {fetchUser()}, 0)
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="home" element={<Home />} />
				<Route path="account" element={<Account />} />
				<Route path="exercises" element={<Exercises />} />
				<Route path="exercises-search" element={<ExercisesSearch />} />
				<Route path="meal-plans" element={<MealPlans />} />
				<Route path="pantry" element={<Pantry />} />
				<Route path="workouts" element={<Workouts />} />
			</Routes>
		</BrowserRouter>
	);
}
