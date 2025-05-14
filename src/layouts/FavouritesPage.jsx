import {Typography} from "@mui/material";
import PrintList from "../components/PrintList.jsx";
import * as React from "react";
import "../style/layout/FavouritesLayout.css"

const FavouritesPage = (props) => {
  return (
    <div id={"favourites-container"}>
      <div id={"favourites-header"}>
        <Typography variant="h1">Favourites</Typography>
      </div>
      <div id={"favourites-body"}>
        <div id={"favourites-list"}>
          {props.favouriteTracks.length > 0 ? (
            <PrintList
              allSongs={props.favouriteTracks}
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
            <Typography variant="h6">You don't like anything yet.</Typography>
          )}
        </div>
      </div>

    </div>
  )
}

export default FavouritesPage;