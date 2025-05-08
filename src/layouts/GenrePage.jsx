import {Typography} from "@mui/material";
import * as React from "react";
import PrintList from "../components/PrintList.jsx";
import "../style/layout/SearchResultsLayout.css"

function GenrePage(props) {
  return (
    <div className={"search-results-field"}>
      <Typography variant="h1">{props.currentGenre}</Typography>
      <PrintList
        allSongs={props.allSongs}
        whatToFilter={"genre"}
        filter={props.currentGenre}
        showArtist={true}
        showGenre={false}
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
    </div>
  )
}

export default GenrePage;