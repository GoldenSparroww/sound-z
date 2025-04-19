import {IconButton, Typography} from "@mui/material";
import {List, ListItemButton, ListItemText} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";

function ArtistPage(props) {

  return (
    <div>
      <List>
        <Typography variant="h1">{props.currentArtist}</Typography>
          {props.allSongs
            .filter(song => song.artist === props.currentArtist)
            .map((song, idx) => (
              <ListItemButton
                key={idx}
                selected={props.current === song.url}
                onClick={() => {
                  props.setCurrent(song.url);
                }}>
                <Typography sx={{pr: 3}}>{idx + 1}</Typography>
                <ListItemText primary={song.name} />
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


  )
}

export default ArtistPage;
