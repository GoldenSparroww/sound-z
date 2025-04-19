import {IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";

function GenrePage(props) {
  return (
  <List>
      <Typography variant="h1">{props.currentGenre}</Typography>
      {props.allSongs
        .filter(song => song.genre === props.currentGenre)
        .map((song, idx) => (
          <ListItemButton
            key={idx}
            selected={props.current === song.url}
            onClick={() => {
              props.setCurrent(song.url);
            }}>
            <Typography sx={{pr: 3}}>{idx + 1}</Typography>
            <ListItemText primary={song.name} secondary={`${song.artist}`} />
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
  )
}

export default GenrePage;