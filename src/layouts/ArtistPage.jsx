import {Typography} from "@mui/material";
import * as React from "react";
import PrintList from "../components/PrintList.jsx";
import "../style/layout/SearchResultsLayout.css"

function ArtistPage(props) {
  return (
    <div className={"search-results-field"}>
      <Typography variant="h1">{props.currentArtist}</Typography>
      <PrintList
        allSongs={props.allSongs}
        whatToFilter={"artist"}
        filter={props.currentArtist}
        showArtist={true}
        showGenre={true}
        current={props.current}
        setCurrent={props.setCurrent}
        FavouritesAdd={props.FavouritesAdd}
        FavouritesRemove={props.FavouritesRemove}
        favouriteTracks={props.favouriteTracks}
        /*QueueAdd={props.QueueAdd}
        QueueRemove={props.QueueRemove}
        queueTracks={props.queueTracks}*/
        ChangeActiveList={props.ChangeActiveList}
        AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
        HandleActionPopup={props.HandleActionPopup}
      ></PrintList>
    </div>
  )
}

export default ArtistPage;
