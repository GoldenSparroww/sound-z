import React, {useState} from "react";
import "../style/layout/PopupEditPlaylist.css"
import {Button, TextField} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import ThemeForm from "../global/ThemeForm.js";
import {ThemeProvider} from "@mui/material/styles";

const PopupEditPlaylist = (props) => {
  const [currentlyEdited, setCurrentlyEdited] = useState({
    [props.currentPlaylist]: {...props.playlists[props.currentPlaylist]}});

  const TemporarySaveName = (e) => {
    setCurrentlyEdited({[e.target.value]: {...props.playlists[props.currentPlaylist]}});
  };

  const TemporarySaveDescription = (e) => {
    //setCurrentlyEdited({...currentlyEdited, description: e.target.value})
  };

  const TemporarySaveImage = (e) => {
    setCurrentlyEdited({...currentlyEdited, image: e.target.value})
  };

  const SaveChanges = () => {
    const updatedPlaylistName = Object.keys(currentlyEdited)[0];
    props.setPlaylists({
      ...props.playlists,
      [updatedPlaylistName]: currentlyEdited[updatedPlaylistName]
    });
    props.setShownPopupMenu(null);
  };

  return (
    <>
      <div
        id={'popup-menu-background'}
        onClick={() => props.setShownPopupMenu(null)}
      ></div>

      <div id={'popup-menu-content'}>
        <ThemeProvider theme={ThemeForm}>
          <div id={'edit-playlist-popup-container'}>

            <div id={'edit-playlist-popup-image'}>
              <div
                id={'edit-playlist-popup-image-clickable'}
              >
                <img
                  src={props.playlists[props.currentPlaylist].image}
                  style={{
                    minWidth: "200px",
                    minHeight: "200px",
                    objectFit: "fill"
                  }}
                />
              </div>
            </div>

            <TextField
              id="edit-playlist-popup-name"
              label="Název Playlistu"
              variant="outlined"
              defaultValue={props.currentPlaylist}
              onChange={(e) => TemporarySaveName(e)}
            />
            <TextField
              id="edit-playlist-popup-description"
              label="Volitelný popis playlistu"
              variant="outlined"
              defaultValue={props.playlists[props.currentPlaylist].description}
              multiline
              rows={9}
              onChange={(e) => TemporarySaveDescription(e)}
            />
            <div
              id="edit-playlist-popup-button"
            >
              <Button variant="filled" startIcon={<CancelIcon />} onClick={() => props.setShownPopupMenu(null)}>
                Zrušit
              </Button>
              <Button variant="filled" startIcon={<CheckBoxIcon />} onClick={() => SaveChanges()}>
                Uložit
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  )
}

export default PopupEditPlaylist;