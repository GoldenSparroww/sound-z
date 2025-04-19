import {IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from "react";
import "../style/layout/SearchResultsLayout.css"

function SearchResults(props) {
  return (
    <div id="search-results-container">
      <div className={"search-results-field"} id={"search-results-tracks"}>
        {props.searchedResults.tracks.length > 0 && (
          <>
            <Typography variant="h6">SKLADBY</Typography>
            <List>
              {props.searchedResults.tracks.map((song, idx) => (
                <ListItemButton
                  key={idx}
                  selected={props.current === song.url}
                  onClick={() => {
                    props.setCurrent(song.url);
                }}>
                  {/* Pozor mam tu idx na kterem neco zavisi */}
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
          </>
        )}
      </div>

      <div className={"search-results-field"} id={"search-results-genres"}>
        {props.searchedResults.genres.length > 0 && (
          <>
            <Typography variant="h6">ŽÁNRY</Typography>
            <List>
              {props.searchedResults.genres.map((genre, idx) => (
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
      </div>

      <div className={"search-results-field"} id={"search-results-artists"}>
        {props.searchedResults.artists.length > 0 && (
          <>
            <Typography variant="h6">AUTOŘI</Typography>
            <List>
              {props.searchedResults.artists.map((artist, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => props.HandleAuthorSelection(artist)}
                >
                  <ListItemText primary={artist} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResults;