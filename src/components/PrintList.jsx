import {IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LayersIcon from '@mui/icons-material/Layers';
import * as React from "react";
import formatTime from "../logic/FormatTime.js";
import TrackAddContextMenuButton from "./TrackAddContextMenuButton.jsx";

function PrintList(props) {
  const filteredSongs = props.allSongs.filter(song => {
    return (props.whatToFilter !== null ? song[props.whatToFilter] : true) === (props.filter !== null ? props.filter : true)
  });

  return (
    <div>
      <List>
        {filteredSongs
          .map((song, idx) => (
            <ListItemButton
              key={idx}
              selected={props.current.id === song.id}
              onClick={() => {
                props.setCurrent(song);
                props.ChangeActiveList(
                  idx,
                  filteredSongs
                );
              }}>
              <Typography
                sx={{
                  pr: 3,
                  fontSize: "1.2rem",
                  minWidth: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
              }}>{idx + 1}</Typography>
              <img
                src={`http://localhost/music/images/${song.image}`}
                alt={song.image}
              ></img>
              <ListItemText
                sx={{pl: 3}}
                primary={song.name}
                secondary={`${props.showArtist ? song.artist : ''} ${props.showArtist && props.showGenre ? '•' : '' } ${props.showGenre ? song.genre : ''}`} />
              <Typography sx={{pr: "15%", pl: "5%"}}>
                {formatTime(song.duration)}
              </Typography>
              <div onClick={(e) => {e.stopPropagation()}}>
                <TrackAddContextMenuButton
                  playlists={props.playlists}
                  setPlaylists={props.setPlaylists}
                  boundTrack={song}
                  HandleActionPopup={props.HandleActionPopup}
                />
              </div>

              <IconButton
                onClick={ (e) => {
                  e.stopPropagation();
                  props.AddImmediateFollowingTracks(song);
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