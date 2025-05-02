import "../style/layout/PlaylistPageLayout.css"
import PrintList from "../components/PrintList.jsx";
import * as React from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuIcon from '@mui/icons-material/Menu';

const PlaylistPage = (props) => {

  return (
    <div id={"playlist-page-container"}>
      <div id={"playlist-header"}>
        <span id={'playlist-name'}>{props.currentPlaylist}</span>
        <div
          id={'playlist-image'}
        ></div>
        <div id={'playlist-description'}>
          <p>3 Tracks</p>
          <p>8:11</p>
        </div>
        <div id={'playlist-options'}>
          <PlayCircleIcon sx={{ fontSize: '5em' }} />
          <MenuIcon sx={{ fontSize: '3em' }}/>
        </div>
      </div>

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
  )
}

export default PlaylistPage;