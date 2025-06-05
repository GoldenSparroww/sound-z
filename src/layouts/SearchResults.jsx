import {
  Button,
  Checkbox, Radio,
  FormControlLabel,
  FormGroup, FormLabel,
  List,
  ListItemButton,
  ListItemText, RadioGroup,
  Typography, FormControl
} from "@mui/material";
import * as React from "react";
import "../style/layout/SearchResultsLayout.css"
import PrintList from "../components/PrintList.jsx";
import {ThemeProvider} from "@mui/material/styles";
import ThemeForm from "../global/ThemeForm.js";
import {useEffect, useState} from "react";
import Colors from "../global/Colors.js";

const defaultState = {
  searchBy: {
    tracks: true,
    artists: true,
    genres: true,
  },
  orderBy: "tracks",
  ordering: "none",
};

const SearchResults = (props) => {
  const initialState = {
    searchBy: {
      tracks: props.songNameEnable,
      artists: props.songArtistEnable,
      genres: props.songGenreEnable,
    },
    orderBy: "tracks",
    ordering: "none",
  };

  const [subSection, setSubSection] = useState("tracks")
  const [formState, setFormState] = useState(initialState)
  const [adjustedResults, setAdjustedResults] = useState([])

  useEffect(() => {
    setAdjustedResults([...props.searchedResults.tracks])
  },[props.searchedResults.tracks])

  const ResultSectionSelect = (section) => {
    setSubSection(section)
  };

  const handleApply = () => {
    const { orderBy, ordering } = formState;

    props.setSongNameEnable(formState.searchBy.tracks);
    props.setSongArtistEnable(formState.searchBy.artists);
    props.setSongGenreEnable(formState.searchBy.genres);

    if (ordering === "none") {
      setAdjustedResults([...props.searchedResults.tracks]);
      return;
    }

    // prijima sortovaci funkci
    const sortedTracks = [...props.searchedResults.tracks].sort((a, b) => {
      let comparison = 0;

      switch (orderBy) {
        case "tracks":
          comparison = a.name.localeCompare(b.name);
          break;
        case "artists":
          comparison = a.artist.localeCompare(b.artist);
          break;
        case "genres":
          comparison = a.genre.localeCompare(b.genre);
          break;
        default:
          return;
      }

      // pokud je descending tak vynasobenim -1 se obrati poradi
      return ordering === "descending" ? comparison * -1 : comparison;
    });

    setAdjustedResults(sortedTracks);
  };

  const handleReset = () => {
    setFormState(defaultState);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormState((lastFormState) => ({
      ...lastFormState,
      searchBy: { ...lastFormState.searchBy, [name]: checked },
    }));
  };

  const handleRadioChange = (e) => {
    //name je jmeno groupy a value hodnota radio buttonu
    const { name, value } = e.target;
    // kvuli tomu ze uzivatel muze rychle klikat, tak je nezbytne funkcne aktualizovat prop v pripade napr. rychlim klikani
    setFormState((lastFormState) => ({ ...lastFormState, [name]: value }));
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

      {subSection === "tracks" && (
        <ThemeProvider theme={ThemeForm}>
          <div className={"search-results-field"}>

            {/* tady ten padding je v uz nad h4 platny pro ostatni, protoze je v theme z frameLayout, tady je ale prekryty themeForm, tak ho tu nastavim manulane znova */}
            <div id={"additional-filters-header"}>
              <Typography sx={{padding:"1rem"}} variant="h4">Search options</Typography>
            </div>

            <div id={"additional-filters"}>
              <FormControl>
                <FormGroup>
                  <FormLabel>Search within:</FormLabel>
                  <FormControlLabel
                    control={<Checkbox name={"tracks"} checked={formState.searchBy.tracks} onChange={(e) => handleCheckboxChange(e)} />}
                    label="Track's name" />
                  <FormControlLabel
                    control={<Checkbox name={"artists"} checked={formState.searchBy.artists} onChange={(e) => handleCheckboxChange(e)} />}
                    label="Artist's name" />
                  <FormControlLabel
                    control={<Checkbox name={"genres"} checked={formState.searchBy.genres} onChange={(e) => handleCheckboxChange(e)} />}
                    label="Genre's name" />
                </FormGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Order by:</FormLabel>
                <RadioGroup name={"orderBy"} value={formState.orderBy} onChange={(e) => handleRadioChange(e)}>
                  <FormControlLabel value="tracks" control={<Radio />} label="Track" />
                  <FormControlLabel value="artists" control={<Radio />} label="Artist" />
                  <FormControlLabel value="genres" control={<Radio />} label="Genre" />
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Ordering:</FormLabel>
                <RadioGroup name={"ordering"} value={formState.ordering} onChange={(e) => handleRadioChange(e)}>
                  <FormControlLabel value="none" control={<Radio />} label="None" />
                  <FormControlLabel value="ascending" control={<Radio />} label="Ascending (A-Z)" />
                  <FormControlLabel value="descending" control={<Radio />} label="Descending (Z-A)" />
                </RadioGroup>
              </FormControl>

              <div id={"form-submit"}>
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleApply}>Apply</Button>
              </div>
            </div>

          </div>
        </ThemeProvider>
      )}

      {subSection === "tracks" ? (
        props.searchedResults.tracks.length > 0 ? (
          <div className={"search-results-field"} id={"search-results-tracks"}>
            <Typography variant="h4">Tracks</Typography>
            <PrintList
              allSongs={adjustedResults}
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