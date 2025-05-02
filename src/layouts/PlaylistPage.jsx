import "../style/layout/PlaylistPageLayout.css"
import PrintList from "../components/PrintList.jsx";
import * as React from "react";

const PlaylistPage = (props) => {

  return (
    <div id={"playlist-page-container"}>
      <div id={"playlist-header"}>
        <h1>{props.currentPlaylist}</h1>
      </div>

      <PrintList
        allSongs={props.playlists[props.currentPlaylist]}
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