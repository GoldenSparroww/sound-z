import {IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LayersIcon from '@mui/icons-material/Layers';
import * as React from "react";

function PrintList(props) {

  return (
    <div>
      <List>
        {props.allSongs
          .filter(song => {
            /* pokud whatToFilter a filter je null, tak se nic nefiltruje */
            return (props.whatToFilter !== null ? song[props.whatToFilter] : true) === (props.filter !== null ? props.filter : true);
          })
          .map((song, idx) => (
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
                secondary={`${props.showArtist ? song.artist : ''} ${props.showGenre ? '•' : '' } ${props.showGenre ? song.genre : ''}`} />
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
  )
}

export default PrintList;