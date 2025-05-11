import {Button} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Typography from "@mui/material/Typography";
import {ThemeProvider} from "@mui/material/styles";
import themeForm from "../global/ThemeForm.js";

const PopupRemovePlaylist = (props) => {

  const handleRemove = () => {
    props.setShownPopupMenu(false);
    props.setShownMainSection("homepage");
    props.setPlaylists(props.playlists.filter((playlist) =>
      playlist.id !== props.currentPlaylist
    ));
  }

  return (
    <>
      <ThemeProvider theme={themeForm}>
      <div
        id={'popup-menu-background'}
        onClick={() => props.setShownPopupMenu(null)}
      ></div>

      <div id={'popup-menu-content'} className="mui-like-border">
        <Typography variant="h6" color="textSecondary" component="div">
          Are you sure you want to delete this playlist?
        </Typography>
        <div
          id="edit-playlist-popup-button"
        >
          <Button
            variant="filled"
            startIcon={<CancelIcon />}
            onClick={() => {props.setShownPopupMenu(false);}}
            sx={{ width: '120px' }}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            startIcon={<CheckBoxIcon />}
            onClick={handleRemove}
            sx={{ width: '120px' }}
          >
            Delete
          </Button>
        </div>
      </div>
      </ThemeProvider>
    </>
  )
}

export default PopupRemovePlaylist;