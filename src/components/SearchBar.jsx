import { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";

function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");

  const API_URL = "http://localhost/list.php";
  const query = inputValue.toLowerCase();

  const tracks = props.allSongs
    .filter(song => {
      return (
        song.name.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query)
      )
    })
    .slice(0, 5);

  /* reduce((acc, song) - acc je prazdne pole, kam se budou vkladat jen unikatni hodnoty */

  const genres = props.allSongs
    .filter(song => song.genre.toLowerCase().includes(query))
    .reduce((acc, song) => {
      if (!acc.includes(song.genre)) acc.push(song.genre);
      return acc;
    }, [])
    .slice(0, 3);

  const artists = props.allSongs
    .filter(song => song.artist.toLowerCase().includes(query))
    .reduce((acc, song) => {
      if (!acc.includes(song.artist)) acc.push(song.artist);
      return acc;
    }, [])
    .slice(0, 5);

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
