import {List, ListItemButton, ListItemText, Typography} from "@mui/material";
import * as React from "react";
import "../style/layout/SearchResultsLayout.css"
import PrintList from "../components/PrintList.jsx";

const SearchResults = (props) => {
  return (
    <div id="search-results-container">

      {props.searchedResults.tracks.length > 0 && (
        <div className={"search-results-field"} id={"search-results-tracks"}>
          <Typography variant="h4">Tracks</Typography>
          <PrintList
            allSongs={props.searchedResults.tracks}
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
            clearQueueOnClick={true}
          ></PrintList>
        </div>
      )}

      {props.searchedResults.genres.length > 0 && (
        <div className={"search-results-field"} id={"search-results-genres"}>
          <Typography variant="h4">Genres</Typography>
          <List>
            {props.searchedResults.genres.map((genre, idx) => (
              <ListItemButton
                key={idx}
                onClick={() => props.HandleGenreSelection(genre)}
              >
                <ListItemText primary={genre} />
              </ListItemButton>
            ))}
          </List>
        </div>
      )}

      {props.searchedResults.artists.length > 0 && (
        <div className={"search-results-field"} id={"search-results-artists"}>
          <Typography variant="h4">Artists</Typography>
          <List>
            {props.searchedResults.artists.map((artist, idx) => (
              <ListItemButton
                key={idx}
                onClick={() => props.HandleArtistSelection(artist)}
              >
                <ListItemText primary={artist} />
              </ListItemButton>
            ))}
          </List>
        </div>
      )}

    </div>
  )
}

export default SearchResults;