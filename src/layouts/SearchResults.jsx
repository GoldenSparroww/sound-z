import {Button, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import * as React from "react";
import "../style/layout/SearchResultsLayout.css"
import PrintList from "../components/PrintList.jsx";
import {ThemeProvider} from "@mui/material/styles";
import ThemeForm from "../global/ThemeForm.js";
import {useState} from "react";
import Colors from "../global/Colors.js";

const SearchResults = (props) => {
  const [subSection, setSubSection] = useState("tracks")

  const ResultSectionSelect = (section) => {
    setSubSection(section)
  };

  return (
    <div id="search-results-container">

      <ThemeProvider theme={ThemeForm}>
        <div id={"search-sections-selection"}>
          <Button
            className={"search-sections-selection-button"}
            onClick={() => ResultSectionSelect("tracks")}
            sx={{ color: subSection === "tracks" ? Colors.color_details : Colors.color_text }}
          >
            Tracks
          </Button>
          <Button
            className={"search-sections-selection-button"}
            onClick={() => ResultSectionSelect("artists")}
            sx={{ color: subSection === "artists" ? Colors.color_details : Colors.color_text }}
          >
            Artists
          </Button>
          <Button
            className={"search-sections-selection-button"}
            onClick={() => ResultSectionSelect("genres")}
            sx={{ color: subSection === "genres" ? Colors.color_details : Colors.color_text }}
          >
            Genres
          </Button>
        </div>
      </ThemeProvider>

      {subSection === "tracks" ? (
        props.searchedResults.tracks.length > 0 ? (
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
        ) : (
          <div className={"search-results-field"} id={"search-results-artists"}>
            <Typography variant="h6"> No tracks found. </Typography>
          </div>
        )
      ) : (
        subSection === "artists" ? (
          props.searchedResults.artists.length > 0 ? (
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
          ) : (
            <div className={"search-results-field"} id={"search-results-artists"}>
              <Typography variant="h6"> No artists found. </Typography>
            </div>
          )
        ) : (
          /* subSection === "genres" */
          props.searchedResults.genres.length > 0 ? (
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
          ) : (
            <div className={"search-results-field"} id={"search-results-artists"}>
              <Typography variant="h6"> No genres found. </Typography>
            </div>
          )
        )
      )}

    </div>
  )
}

export default SearchResults;