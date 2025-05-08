import "../style/layout/PlaylistPageLayout.css"
import PrintList from "../components/PrintList.jsx";
import * as React from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import formatTime from "../logic/FormatTime.js";
import PlaylistContextMenuButton from "../components/PlaylistContextMenuButton.jsx";
import {IconButton, Typography} from "@mui/material";
import {useState} from "react";

const PlaylistPage = (props) => {
  const [playingNow, setPlayingNow] = useState(false);

  const selectedPlaylist = props.playlists.find(playlist => playlist.id === props.currentPlaylist);

  const totalTrackTime = selectedPlaylist["songs"].reduce((acc, song) => acc + song.duration, 0);

  const trackCount = selectedPlaylist["songs"].length;

  /*const PlayPlaylist = () => {
    if (props.playlists[props.currentPlaylist]["songs"][0]) {
      props.setCurrent(props.playlists[props.currentPlaylist]["songs"][0]);
      props.ChangeActiveList(
        0,
        [...props.playlists[props.currentPlaylist]["songs"]]
      );
    } else {
      props.HandleActionPopup("Playlist je prázdný!");
    }
  };*/

  const PlayButtonHandle = () => {
    setPlayingNow(!playingNow);
  }
  console.log(props.playlists, props.currentPlaylist)

  return (
    <div id={"playlist-page-container"}>
      <div id={"playlist-header"}>
        <span
          id={'playlist-name'}
        >
          {selectedPlaylist["name"]}
        </span>
        <div
          style={{width:'300px', height:'300px'}}
          id={'playlist-image'}
        >
          <img
            src={selectedPlaylist.image}
            alt={"Image Preview"}
            style={{
              minWidth:'100%',
              minHeight:'100%'
            }}
          />
        </div>
        <div id={'playlist-description'}>
          <Typography id={'playlist-description-track-count'} sx={{overflow: 'hidden', textOverflow: 'ellipsis'}} >
            {trackCount} {trackCount === 1 ? "track" : "tracks"}
          </Typography>
          <Typography id={'playlist-description-total-time'} sx={{overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'nowrap'}} >
            {formatTime(totalTrackTime)}
          </Typography>
          {selectedPlaylist["description"] !== "" ?
            <hr style={{width: '100%'}}/>
            : null
          }
          <Typography id={'playlist-description-text'} sx={{overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'nowrap'}} >
            {selectedPlaylist["description"]}
          </Typography>
        </div>
        <div id={'playlist-options'}>
          <IconButton onClick={PlayButtonHandle}>
            {!playingNow ? <PlayCircleIcon sx={{fontSize: '5rem'}}/> : <PauseCircleIcon sx={{fontSize: '5rem'}}/>}
          </IconButton>
          <PlaylistContextMenuButton
            setShownPopupMenu={props.setShownPopupMenu}
            AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
            setPlaylists={props.setPlaylists}
            currentPlaylist={props.currentPlaylist}
            playlists={props.playlists}
            setShownMainSection={props.setShownMainSection}
          />
        </div>
      </div>

      <div id={'playlist-content'}>
        {selectedPlaylist["songs"].length > 0 ? (
          <PrintList
            allSongs={selectedPlaylist["songs"]}
            whatToFilter={null}
            filter={null}
            showArtist={true}
            showGenre={true}
            current={props.current}
            setCurrent={props.setCurrent}
            FavouritesAdd={props.FavouritesAdd}
            FavouritesRemove={props.FavouritesRemove}
            favouriteTracks={props.favouriteTracks}
            ChangeActiveList={props.ChangeActiveList}
            AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
            HandleActionPopup={props.HandleActionPopup}
            playlists={props.playlists}
            setPlaylists={props.setPlaylists}
          ></PrintList>
        ) : (
          <p>
            Je tu tak smutno... Co si takhle něco přidat?
          </p>
        )}
      </div>

    </div>
  )
}

export default PlaylistPage;