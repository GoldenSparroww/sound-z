import {IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";

function PrintList(props) {

  return (
    <div>
      <List>
        {props.allSongs
          .filter(song => song[props.whatToFilter] === props.filter)
          .map((song, idx) => (
            <ListItemButton
              key={idx}
              selected={props.current === song.url}
              onClick={() => {
                props.setCurrent(song.url);
              }}>
              <Typography sx={{pr: 3}}>{idx + 1}</Typography>
              <ListItemText
                primary={song.name}
                secondary={`${props.showArtist ? song.artist : ''} ${props.showGenre ? '•' : '' } ${props.showGenre ? song.genre : ''}`} />
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

export default PrintList;