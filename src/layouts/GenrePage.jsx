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
        QueueAdd={props.QueueAdd}
        QueueRemove={props.QueueRemove}
        queueTracks={props.queueTracks}
        HandleActionPopup={props.HandleActionPopup}
      ></PrintList>
    </div>
  )
}

export default GenrePage;