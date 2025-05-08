import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from '@mui/icons-material/Add';

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
      props.HandleActionPopup(`Písnička už je v playlistu ${currentPlaylist.name} obsažena!`);
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
        <MenuItem sx={{textAlign: "center", fontSize: "1.1rem"}} disabled={true}>Add to playlist...</MenuItem>
        <Divider />
        {props.playlists.map((playlist, idx) => (
          <MenuItem
            key={idx}
            onClick={() => handlePlaylistAdded(playlist, props.boundTrack)}
          >
            <ListItemText>{playlist.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}