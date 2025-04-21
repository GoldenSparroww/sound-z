import {IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from "react";
import "../style/layout/SearchResultsLayout.css"
import LayersIcon from "@mui/icons-material/Layers";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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
                <Typography sx={{pr: 3, fontSize: "1.2rem"}}>{idx + 1}</Typography>
                <img
                  src={`http://localhost/music/images/${song.image}`}
                  alt={song.image}
                ></img>
                <ListItemText
                  sx={{pl: 3}}
                  primary={song.name}
                  secondary={`${song.artist} • ${song.genre}`} />
                <Typography sx={{pr: "15%", pl: "5%"}}>{song.duration}</Typography>
                <IconButton
                  onClick={ (e) => {
                    e.stopPropagation();
                    props.QueueAdd(song);
                    props.HandleActionPopup("Přidáno do fronty.");
                  }}>
                  <LayersIcon />
                </IconButton>
                <IconButton
                  onClick={ (e) => {
                    if (props.favouriteTracks.includes(song)){
                      props.FavouritesRemove(song);
                      props.HandleActionPopup("Odebráno z oblíbených.");
                    } else {
                      props.FavouritesAdd(song);
                      props.HandleActionPopup("Přidáno do oblíbených.");
                    }
                    e.stopPropagation();
                  }}>
                  {(props.favouriteTracks.includes(song)) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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