import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";

function SearchBar() {
  const [allSongs, setAllSongs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState({ tracks: [], genres: [], artists: [] });
  const [current, setCurrent] = useState(null);

  const API_URL = "http://localhost/list.php";
  const query = inputValue.toLowerCase();

  const tracks = allSongs
    .filter(song => song.name.toLowerCase().includes(query))
    .slice(0, 5);

  /* reduce((acc, song) - acc je prazdne pole, kam se budou vkladat jen unikatni hodnoty */

  const genres = allSongs
    .filter(song => song.genre.toLowerCase().includes(query))
    .reduce((acc, song) => {
      if (!acc.includes(song.genre)) acc.push(song.genre);
      return acc;
    }, [])
    .slice(0, 3);

  const artists = allSongs
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
      .then(data => setAllSongs(data));
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setResults({ tracks: [], genres: [], artists: [] });
      return;
    }

    setResults({ tracks, genres, artists });
  }, [inputValue, allSongs]);

  return (
    <Box sx={{ maxWidth: 700, margin: "auto"}}>
      <TextField
        fullWidth
        label="Hledat"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Box>
        {results.tracks.length > 0 && (
          <>
            <Typography variant="h6">🎵 Skladby</Typography>
            <List>
              {results.tracks.map((song, idx) => (
                <ListItemButton key={idx} onClick={() => setCurrent(song.url)}>
                  <ListItemText primary={song.name} secondary={`${song.artist} • ${song.genre}`} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {results.genres.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">🎧 Žánry</Typography>
            <List>
              {results.genres.map((genre, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => alert(`Zobrazit skladby pro žánr: ${genre}`)}
                >
                  <ListItemText primary={genre} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {results.artists.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">🎤 Autoři</Typography>
            <List>
              {results.artists.map((artist, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => alert(`Zobrazit skladby pro autora: ${artist}`)}
                >
                  <ListItemText primary={artist} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>

      {current && (
        <Box mt={4}>
          <audio controls autoPlay src={current} style={{ width: "100%" }} />
        </Box>
      )}
    </Box>
  );
}

export default SearchBar;
