import {Typography} from "@mui/material";
import * as React from "react";
import PrintList from "../components/PrintList.jsx";
import "../style/layout/SearchResultsLayout.css"
import AudioFileIcon from "@mui/icons-material/AudioFile";

const GenrePage = (props) => {
  return (
    <>
      <div className={"search-results-specific-field-header"}>
        <AudioFileIcon id={"search-results-icon"} sx={{ fontSize: "6rem" }} />
        <Typography variant="h1">{props.currentGenre}</Typography>
      </div>

      <div className="search-results-specific-field-body">
        <div className={"search-results-specific-field-content"}>
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
      </div>
    </>
  )
}

export default GenrePage;