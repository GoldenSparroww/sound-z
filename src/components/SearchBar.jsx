import { useEffect, useState } from "react";
import {TextField, Box, IconButton} from "@mui/material";
import GetSearchedResults from "../logic/GetSearchedResults.js";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");

  const API_URL = "http://localhost/list.php";
  const query = inputValue.toLowerCase();

  let {tracks, genres, artists} = GetSearchedResults(props.allSongs, query);
  tracks = tracks.slice(0, 5);
  genres = genres.slice(0, 5);
  artists = artists.slice(0, 5);

  const checkInputValue = (e) => {
    let newValue = e.target.value;

    if (newValue.length > 200) {
      newValue = newValue.slice(0, 200);
    }

    setInputValue(newValue);
  }

  /*------------------------------------------------*/

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => props.setAllSongs(data))
      .catch(error => {
        props.HandleActionPopup(`Error while getting data from server. Check your internet connection`, 5000);
        console.error(`Error while getting data from server.${error}`);
      });
  }, []);

  useEffect(() => {
    searchInputValue();
  }, [inputValue, props.allSongs]);

  const searchInputValue = () => {
    if (!inputValue) {
      props.setSearchedResults({ tracks: [], genres: [], artists: [] });
      return;
    }

    props.ChangeMainSection("search-results")
    props.setSearchedResults({ tracks, genres, artists });
  };

  return (
    <Box sx={{
      flex: 1,
      maxWidth:"700px",
      display: "flex",
      flexDirection: "row",
      gap: "0.5rem",
      alignItems: "center",
    }}>
      <TextField
        fullWidth
        label="Search"
        value={inputValue}
        onChange={(e) => checkInputValue(e)}
        variant="filled"
      />
      <IconButton
        sx={{
          width: "3rem",
          height: "3rem",
        }}
        onClick={searchInputValue}
      >
        <SearchIcon/>
      </IconButton>
    </Box>
  );
}

export default SearchBar;
