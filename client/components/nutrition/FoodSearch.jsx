import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Snackbar } from '@mui/material'


//search bar input

//add food object to pantry button

const SearchBox = styled(Box)`
display: flex; 
flex-direction: row; 
align-items: center;
`

const CustomButt = styled(Button)`
background: linear-gradient(45deg, #556270 30%, #FF6B6B 90%);
padding: 15px;
margin: 15px;
`;

export default function FoodSearch(props){
  
  const [searchField, setSearch] = useState('')
  const [searchResults, setResults] = useState({})

  const handleChange = (e)=> {
    setSearch(e.target.value)

  }
////////////////////////////////////////////////////
//on click, we search for the food item
  const handleClick = ()=>{
    //and the search to the /FoodSearch endpoint
    axios.get(`/user/nutrition/search/${searchField}`)
    .then((foodInfo)=>{

      setResults(foodInfo.data)

      let inPantry = false

      for (let i = 0; i < props.user.nutrition.length; i++){
        if (props.user.nutrition[i].foodId === foodInfo.data.foodId){
          inPantry = true;
        }
      }

      if(!inPantry){
        handleAdd(foodInfo.data)
      }
    })
    .catch((err)=>{
      console.error(err);
    })
  }


  const handleAdd = (foodInfo)=>{
    axios.put(`/user/nutrition/create`, { nutrition: foodInfo })
    .then((data) => {

        setSearch('')
        props.fetchUser()
      })
      .catch((err)=>{
        console.error(`Error during PUT request to database.`)
      })
  }

///////////////////////////////////////////////////////
  return(
    <SearchBox >

      <TextField value={searchField} sx={{margin: 'auto'}} variant="outlined" label="Search Foods" type="text" id='food-search' onChange={handleChange}/>

      <CustomButt sx={{ "&:hover": { background: 'linear-gradient(45deg, #FF6B6B 30%, #556270 90%)'} }} variant="contained" type="submit" onClick={handleClick}>Add Food</CustomButt>

    </SearchBox>
  )
}
