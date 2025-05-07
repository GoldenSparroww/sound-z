import "../style/layout/PlaylistPageLayout.css"
import PrintList from "../components/PrintList.jsx";
import * as React from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import formatTime from "../logic/FormatTime.js";
import PlaylistMenu from "../components/PlaylistMenu.jsx";
import {IconButton} from "@mui/material";
import {useState} from "react";

const PlaylistPage = (props) => {
  const [playingNow, setPlayingNow] = useState(false);

  const totalTrackTime = props.playlists[props.currentPlaylist]["songs"].reduce((sum, song) => {
    return sum + song.duration;
  }, 0)

  const trackCount = props.playlists[props.currentPlaylist]["songs"].length;

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

  return (
    <div id={"playlist-page-container"}>
      <div id={"playlist-header"}>
        <span id={'playlist-name'}>{props.currentPlaylist}</span>
        <div
          style={{width:'300px', height:'300px'}}
          id={'playlist-image'}
        >
          <img
            src={props.playlists[props.currentPlaylist].image}
            style={{
              minWidth:'100%',
              minHeight:'100%',
              objectFit: "fill"
            }}
          />
        </div>
        <div id={'playlist-description'}>
          <p>
            {trackCount} {trackCount === 1 ? "track" : "tracks"}
          </p>
          <p>
            {formatTime(totalTrackTime)}
          </p>
          <p>
            {props.playlists[props.currentPlaylist]["description"]}
          </p>
        </div>
        <div id={'playlist-options'}>
          <IconButton onClick={PlayButtonHandle}>
            {!playingNow ? <PlayCircleIcon sx={{fontSize: '5rem'}}/> : <PauseCircleIcon sx={{fontSize: '5rem'}}/>}
          </IconButton>
          <PlaylistMenu
            setShownPopupMenu={props.setShownPopupMenu}
          />
        </div>
      </div>

      <div id={'playlist-content'}>
        <PrintList
          allSongs={props.playlists[props.currentPlaylist]["songs"]}
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
        ></PrintList>
      </div>

    </div>
  )
}

export default PlaylistPage;