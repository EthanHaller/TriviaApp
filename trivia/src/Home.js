import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Home( {link, changeView, changeNumQuestions} ) {
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState("Any Category");
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch(("https://opentdb.com/api_category.php"));
            const data = await response.json();
            setCategories(data.trivia_categories);
          }
          catch(error) {
            console.log(error);
          }
        }
        fetchCategories();
      }, []);
      if(!categories) return;
      let apiLink = ""
      apiLink = "https://opentdb.com/api.php?amount="
      apiLink += numberOfQuestions
      if(category !== "Any Category") {
        apiLink += "&category="
        categories.forEach(item => {
            if(item.name === category) apiLink += item.id
        })
      }
      changeNumQuestions(numberOfQuestions)
      link(apiLink)

      console.log(apiLink);

      const Categories = () => {
        const categoryStrings = ["Any Category"]
        categories.forEach(item => {categoryStrings.push(item.name)})

        const handleCategorySelect = event => {
            setCategory(event.target.value);
        }

        const items = categoryStrings.map(name => {
            return <MenuItem key={name} value={name}>{name}</MenuItem>
        })

        return (
            <Box id={"box"}>
              <FormControl id={"select"}>
                <InputLabel>Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleCategorySelect}
                >
                    {items}
                </Select>
              </FormControl>
            </Box>
          );
      }

      const Numbers = () => {
        const numbers = []; for(let i=1; i <= 20; i++) numbers.push(i);

        const handleNumberSelect = event => {
            setNumberOfQuestions(event.target.value);
        }

        const items = numbers.map(num => {
            return <MenuItem key={num} value={num}>{num}</MenuItem>
        })

        return (
            <Box id={"box"}>
              <FormControl id={"select"}>
                <InputLabel>Number of Questions</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={numberOfQuestions}
                  label="Number of Questions"
                  onChange={handleNumberSelect}
                >
                    {items}
                </Select>
              </FormControl>
            </Box>
          );
      }


    return (
        <React.Fragment>
            <p className='header'>TRIVIA</p>
            <div id={"selections"}>
                <Categories categories={categories}></Categories>
                <Numbers></Numbers>
            </div>
            <PlayButton changeView={changeView}></PlayButton>
        </React.Fragment>
    )
}

function PlayButton( {changeView} ) {
    return (
        <Button id={"play_game"} onClick={() => changeView(false)} variant='contained'>PLAY</Button>
    )
}

export default Home;