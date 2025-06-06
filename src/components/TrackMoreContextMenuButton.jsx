import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GetPlaylistAutomaticId from "../logic/GetPlaylistAutomaticId.js";
import GetPlaylistAutomaticName from "../logic/GetPlaylistAutomaticName.js";

const TrackMoreContextMenuButton = (props) => {
  // 3.
  // timeout kvuli animaci
  // filtrovani na zacatku

  // 4.
  // dolni cast okolo props.showingInFavourites + komponenty printList a FavouritesPage props

  const filteredPlaylists = props.playlists.filter((plyls) => (!plyls.songs.some((song) => song.id === props.boundTrack.id)))
  const containedInPlaylists = props.playlists.filter((plyls) => (plyls.songs.some((song) => song.id === props.boundTrack.id)))

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTrackAdd = (currentPlaylist, boundTrack) => {
    handleClose()

    setTimeout(() => {
      if (containsBoundTrack(currentPlaylist, boundTrack)) {
        props.HandleActionPopup(`The song is already included in the playlist "${currentPlaylist.name}"!`, 3000);
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
    }, 250)
    //kvuli animaci
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

  const handleRemoveFromPlaylist = (boundTrack) => {
    handleClose();
    let selectedPlaylist = props.playlists.find((playlist) => playlist.id === props.currentPlaylist);

    selectedPlaylist.songs = selectedPlaylist.songs.filter((song) =>
      song.id !== boundTrack.id
    );

    props.setPlaylists([
      ...props.playlists.map((playlist) => (
        playlist.id !== selectedPlaylist.id ? playlist : selectedPlaylist
      ))
    ])
  };

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
        <MoreVertIcon fontSize="3rem" />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        sx={{maxHeight: '30vh', maxWidth: '30rem'}}
        onClose={handleClose}
      >

        {props.isShownInPlaylist && ([
            <MenuItem key={"remove"} onClick={() => {handleRemoveFromPlaylist(props.boundTrack)}}>
              <CloseIcon sx={{ pr: "0.3rem"}}/>
              <ListItemText>Remove from playlist</ListItemText>
            </MenuItem>,
            <Divider key={"divider"} />
        ])}

        <MenuItem sx={{textAlign: "center", fontSize: "1.1rem"}} disabled={true}>
          {(!(props.playlists.length > 0)) ?
            (
              "You have no playlists"
            ) : (
              filteredPlaylists.length === 0 ?
                ("Already contained in every playlist") :
                ("Add to playlist...")
            )}
        </MenuItem>

        {props.playlists.length > 0 ?
          filteredPlaylists
            .map((playlist, idx) =>
          (
            <MenuItem
              key={idx}
              onClick={() => handleTrackAdd(playlist, props.boundTrack)}
            >
              {playlist.name}
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
          )
        }

        {/* UKOL 4 */}
        {props.showingInFavourites && <Divider />}

        {props.showingInFavourites &&
          <MenuItem sx={{textAlign: "center", fontSize: "1.1rem"}} disabled={true}>
            Contained in...
          </MenuItem>
        }

        {props.showingInFavourites && (
          containedInPlaylists.length !== 0 ? (
            containedInPlaylists.map((playlist, idx) => (
              <MenuItem
                key={idx}
                disabled={true}
              >
                {playlist.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled={true}>
              Not contained anywhere
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}

export default TrackMoreContextMenuButton;