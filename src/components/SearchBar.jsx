import { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import GetSearchedResults from "../logic/GetSearchedResults.js";

function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");

  const API_URL = "http://localhost/list.php";
  const query = inputValue.toLowerCase();

  let {tracks, genres, artists} = GetSearchedResults(props.allSongs, query);
  tracks = tracks.slice(0, 5);
  genres = genres.slice(0, 5);
  artists = artists.slice(0, 5);

  /*------------------------------------------------*/

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => props.setAllSongs(data));
  }, []);

  useEffect(() => {
    if (!inputValue) {
      props.setSearchedResults({ tracks: [], genres: [], artists: [] });
      return;
    }

    props.setShownMainSection("search-results")
    props.setSearchedResults({ tracks, genres, artists });
  }, [inputValue, props.allSongs]);

  return (
    <Box sx={{ maxWidth: 700, margin: "auto"}}>
      <TextField
        fullWidth
        label="Hledat"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Box>
  );
}

export default SearchBar;
