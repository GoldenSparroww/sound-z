import {IconButton, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LayersIcon from '@mui/icons-material/Layers';
import * as React from "react";
import formatTime from "../logic/FormatTime.js";
import TrackMoreContextMenuButton from "./TrackMoreContextMenuButton.jsx";

function PrintList(props) {
  const filteredSongs = props.allSongs.filter(song => {
    return (props.whatToFilter !== null ? song[props.whatToFilter] : true) === (props.filter !== null ? props.filter : true)
  });

  const handleListItemClick = (song, idx) => {
    props.setCurrent(song);
    if (!props.clearQueueOnClick) {
      props.ChangeActiveList(
        idx,
        filteredSongs
      );
    } else {
      props.ChangeActiveList(0,[])
    }
  }

  const handleFavouritesClick = (song) => {
    if (props.favouriteTracks.includes(song)){
      props.FavouritesRemove(song);
      props.HandleActionPopup("Odebráno z oblíbených.");
    } else {
      props.FavouritesAdd(song);
      props.HandleActionPopup("Přidáno do oblíbených.");
    }
  }

  const handleQueueClick = (song) => {
    props.AddImmediateFollowingTracks(song);
    props.HandleActionPopup("Přidáno do fronty.");
  }

  return (
    <div>
      <List>
        {filteredSongs
          .map((song, idx) => (
            <ListItemButton
              key={idx}
              selected={props.current.id === song.id}
              onClick={() => handleListItemClick(song, idx)}>
              <Typography
                sx={{
                  pr: 3,
                  fontSize: "1.2rem",
                  minWidth: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
              }}>
                {idx + 1}
              </Typography>
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

              <IconButton
                onClick={ (e) => {
                  e.stopPropagation();
                  handleQueueClick(song);
                }}>
                <LayersIcon />
              </IconButton>
              <IconButton
                onClick={ (e) => {
                  handleFavouritesClick(song);
                  e.stopPropagation();
                }}>
                {(props.favouriteTracks.includes(song)) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <div onClick={(e) => {e.stopPropagation()}}>
                <TrackMoreContextMenuButton
                  playlists={props.playlists}
                  setPlaylists={props.setPlaylists}
                  boundTrack={song}
                  HandleActionPopup={props.HandleActionPopup}
                  isShownInPlaylist={props.isShownInPlaylist}
                  //optional, neni defaultne potreba mimo playlisty, protoze se pak stejne ani neukaze
                  currentPlaylist={props.currentPlaylist}
                  //optional, neni defaultne potreba mimo playlisty, protoze se pak stejne ani neukaze
                  //RefreshQueuePlaylist={props.RefreshQueuePlaylist}
                />
              </div>
            </ListItemButton>
          ))}
      </List>
    </div>
  )
}

export default PrintList;