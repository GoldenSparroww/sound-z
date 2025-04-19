/*

import {IconButton, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";
import GetSearchedResults from "../logic/GetSearchedResults.js";

function PrintList(type, source, filter) {

  const {tracks, genres, artists} = GetSearchedResults(source, filter);

  if (type === "tracks") {

    return (
      tracks.map((song, idx) => (
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
        ))
    )

  } else if (type === "genres") {
    return (<></>)
  } else if (type === "artists") {
    return (<></>)
  }
}

export default PrintList;

*/