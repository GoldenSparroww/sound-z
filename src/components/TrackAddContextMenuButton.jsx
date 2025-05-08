import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton} from "@mui/material";
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

  const handlePlaylistAdded = (currentPlaylist, bindedTrack) => {
    handleClose()

    const updatedPlaylist = {
      ...currentPlaylist,
      songs: [
        ...currentPlaylist.songs,
        bindedTrack,
      ]
    }

    props.setPlaylists([
      ...props.playlists.map((playlist) =>
        playlist.id !== updatedPlaylist.id ? playlist : updatedPlaylist),
    ]);
  }

  return (
    <div>
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
        <MenuItem sx={{textAlign: "center"}} disabled={true}>Add to playlist...</MenuItem>
        {props.playlists.map((playlist, idx) => (
          <MenuItem key={idx} onClick={() => handlePlaylistAdded(playlist, props.bindedTrack)}>
            <ListItemText>{playlist.name}</ListItemText>
          </MenuItem>
        ))}

      </Menu>
    </div>
  );
}