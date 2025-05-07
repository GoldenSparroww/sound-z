import React, {useState} from "react";
import "../style/layout/PopupEditPlaylist.css"
import {Button, TextField} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import ThemeForm from "../global/ThemeForm.js";
import {ThemeProvider} from "@mui/material/styles";

const PopupEditPlaylist = (props) => {
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [currentlyEdited, setCurrentlyEdited] = useState(() => {
    return props.playlists.find(playlist => playlist.id === props.currentPlaylist)
  });

  const TemporarySaveName = (e) => {
    const newName = e.target.value.trim();
    const duplicate = props.playlists.some(
      playlist =>
        playlist.name === newName &&
        playlist.id !== currentlyEdited.id
    );

    if (newName === "") {
      setNameError("Název nesmí být prázdný.");
    } else if (duplicate) {
      setNameError("Název už existuje.");
    } else if (newName.length > 100){
      e.target.value = newName.slice(0, 100);
      setNameError("100/100");
    } else {
      setNameError("");
    }

    setCurrentlyEdited({...currentlyEdited, name: newName});
  };

  const TemporarySaveDescription = (e) => {
    const newValue = e.target.value;

    if (newValue.length > 500) {
      setDescriptionError("500/500")
      e.target.value = newValue.slice(0, 500);
    } else {
      setDescriptionError("");
    }

    setCurrentlyEdited({...currentlyEdited, description: newValue})
  };

  const TemporarySaveImage = (e) => {
    setCurrentlyEdited({...currentlyEdited, image: e.target.value})
  };

  const SaveChanges = () => {
    props.setPlaylists(
      props.playlists.map(playlist =>
        playlist.id === currentlyEdited.id ? currentlyEdited : playlist
      )
    );

    props.setShownPopupMenu(null);
  };

  return (
    <>
      <div
        id={'popup-menu-background'}
        onClick={() => props.setShownPopupMenu(null)}
      ></div>

      <div id={'popup-menu-content'} className="mui-like-border">
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
              defaultValue={props.playlists[props.currentPlaylist].name}
              onChange={(e) => TemporarySaveName(e)}
              helperText={nameError !== "" ? nameError : ""}
              error={nameError !== ""}
            />
            <TextField
              id="edit-playlist-popup-description"
              label="Volitelný popis playlistu"
              variant="outlined"
              defaultValue={props.playlists[props.currentPlaylist].description}
              multiline
              rows={9}
              onChange={(e) => TemporarySaveDescription(e)}
              helperText={descriptionError !== "" ? descriptionError : ""}
              error={descriptionError !== ""}
            />
            <div
              id="edit-playlist-popup-button"
            >
              <Button variant="filled" startIcon={<CancelIcon />} onClick={() => props.setShownPopupMenu(null)}>
                Zrušit
              </Button>
              <Button
                variant="filled"
                startIcon={<CheckBoxIcon />}
                onClick={() => SaveChanges()}
                disabled={!!nameError || currentlyEdited.name.trim() === ""}
              >
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