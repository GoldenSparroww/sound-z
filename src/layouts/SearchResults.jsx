import {IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from "react";
import "../style/layout/SearchResultsLayout.css"

function SearchResults(props) {
  return (
    <div id="search-results-container">

      {props.searchedResults.tracks.length > 0 && (
        <div className={"search-results-field"} id={"search-results-tracks"}>
          <Typography variant="h6">SKLADBY</Typography>
          <List>

            {props.searchedResults.tracks.map((song, idx) => (
              <ListItemButton
                key={idx}
                selected={props.current === song.url}
                onClick={() => {
                  props.setCurrent(song.url);
              }}>
                <Typography sx={{pr: 3}}>{idx + 1}</Typography>
                <ListItemText primary={song.name} secondary={`${song.artist} • ${song.genre}`} />
                <IconButton
                  onClick={ (e) => {
                    e.stopPropagation();
                    alert("Ulozeno do oblibenech xddd");
                    }
                  }>
                  <FavoriteIcon />
                </IconButton>
              </ListItemButton>

            ))}
          </List>
        </div>
      )}

      {props.searchedResults.genres.length > 0 && (
        <div className={"search-results-field"} id={"search-results-genres"}>
          <Typography variant="h6">ŽÁNRY</Typography>
          <List>
            {props.searchedResults.genres.map((genre, idx) => (
              <ListItemButton
                key={idx}
                onClick={() => props.HandleGenreSelection(genre)}
              >
                <ListItemText primary={genre} />
              </ListItemButton>
            ))}
          </List>
        </div>
      )}

      {props.searchedResults.artists.length > 0 && (
        <div className={"search-results-field"} id={"search-results-artists"}>
          <Typography variant="h6">AUTOŘI</Typography>
          <List>
            {props.searchedResults.artists.map((artist, idx) => (
              <ListItemButton
                key={idx}
                onClick={() => props.HandleArtistSelection(artist)}
              >
                <ListItemText primary={artist} />
              </ListItemButton>
            ))}
          </List>
        </div>
      )}

    </div>
  )
}

export default SearchResults;