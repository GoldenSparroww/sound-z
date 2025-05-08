import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GetPlaylistAutomaticId from "../logic/GetPlaylistAutomaticId.js";
import GetPlaylistAutomaticName from "../logic/GetPlaylistAutomaticName.js";

export default function TrackAddContextMenuButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePlaylistAdded = (currentPlaylist, boundTrack) => {
    handleClose()
    
    if (containsBoundTrack(currentPlaylist, boundTrack)) {
      props.HandleActionPopup(`Písnička už je v playlistu ${currentPlaylist.name} obsažena!`, 3000);
      return;
    }
    
    const updatedPlaylist = {
      ...currentPlaylist,
      songs: [
        ...currentPlaylist.songs,
        boundTrack,
      ]
    }

    props.setPlaylists([
      ...props.playlists.map((playlist) =>
        playlist.id !== updatedPlaylist.id ? playlist : updatedPlaylist),
    ]);
  }
  
  const containsBoundTrack = (currentPlaylist, boundTrack) => {
    return currentPlaylist.songs.some(song =>
      song.id === boundTrack.id
    )
  }

  const handleAddNewPlaylist = (track) => {
    handleClose();
    setTimeout(() => {
      const playlistAutomaticNameId = GetPlaylistAutomaticId(props.playlists);
      props.setPlaylists([
        ...props.playlists,
        {
          "id": playlistAutomaticNameId,
          "name": GetPlaylistAutomaticName(props.playlists),
          "image": "http://localhost/default/empty.png",
          "description": "",
          "songs": [{ ...track }]
        }
      ]);
    }, 250);
    // google mui pouziva animace na cca 225 ms - 250 je akorat na to nez skonci
  }

  return (
    <>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      >
        <AddIcon fontSize="3rem" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{textAlign: "center", fontSize: "1.1rem"}} disabled={true}>
          {(!(props.playlists.length > 0)) ? "Nemáš žádný playlist" : "Add to playlist..."}
        </MenuItem>
        <Divider />
        {props.playlists.length > 0 ?
          props.playlists.map((playlist, idx) => (

          <MenuItem
            key={idx}
            onClick={() => handlePlaylistAdded(playlist, props.boundTrack)}
          >
            <ListItemText>{playlist.name}</ListItemText>
          </MenuItem>
        )) : (
          <MenuItem
            sx={{
              textAlign: "center",
              fontSize: "1.1rem"
            }}
            onClick={() => handleAddNewPlaylist(props.boundTrack)}
          >
            <AddBoxIcon sx={{ pr: "0.5rem" }} />
            Vytvořit a přidat
          </MenuItem>
        )}
      </Menu>
    </>
  );
}