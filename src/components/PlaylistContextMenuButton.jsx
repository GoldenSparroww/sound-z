import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListItemText from "@mui/material/ListItemText";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import QueueIcon from '@mui/icons-material/Queue';

export default function PlaylistContextMenuButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const selectedPlaylist = props.playlists.find(playlist => playlist.id === props.currentPlaylist);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleClose();
    props.setShownPopupMenu("edit-playlist");
  }

  const handleQueueAdd = () => {
    handleClose();
    props.AddImmediateFollowingTracks([
      ...selectedPlaylist.songs
    ])
  };

  const handleRemove = () => {
    handleClose();
    props.setShownMainSection("homepage");
    props.setPlaylists(props.playlists.filter((playlist) =>
        playlist.id !== props.currentPlaylist

    ));
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ fontSize: '2rem' }}
      >
        <MoreHorizIcon fontSize="3rem" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleEditClick()}>
          <AddIcon sx={{ paddingRight: '0.5em' }} />
          <ListItemText>Edit playlist appearance</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleQueueAdd()}>
          <QueueIcon sx={{ paddingRight: '0.5em' }} />
          <ListItemText>Add playlist to queue</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleRemove()}>
          <ClearIcon sx={{ paddingRight: '0.5em' }} />
          <ListItemText>Delete playlist</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}