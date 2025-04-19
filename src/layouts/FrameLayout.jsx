import "../style/layout/FrameLayout.css"
import BurgerButton from "../components/BurgerButton.jsx";
import React, {useState} from "react";
import MainSection from "./MainSection.jsx";
import SideBar from "./SideBar.jsx";
import PopupMenu from "../components/PopupMenu.jsx";
import SearchBar from "../components/SearchBar.jsx";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import AudioPlayer from "../components/AudioPlayer.jsx";
import ThemeSongsList from "../global/ThemeSongsList.js";
import {ThemeProvider} from "@mui/material/styles";
import {Snackbar} from "@mui/material";

const FrameLayout = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [shownMainSection, setShownMainSection] = useState("homepage");
  const [shownPopupMenu, setShownPopupMenu] = useState(null);

  const [allSongs, setAllSongs] = useState([]);
  const [searchedResults, setSearchedResults] = useState({ tracks: [], genres: [], artists: [] });

  const [current, setCurrent] = useState(null); /* URL of current track */
  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(null);

  const [favouriteTracks, setFavouriteTracks] = useState([]);
  const [queueTracks, setQueueTracks] = useState([]);

  const [actionPopup, setActionPopup] = useState(false);
  const [actionPopupMessage, setActionPopupMessage] = useState("");

  const HandleArtistSelection = (artist) => {
    if (artist) {
      setCurrentArtist(artist);
      setShownMainSection("artist");
    }
  }

  const HandleGenreSelection = (genre) => {
    if (genre) {
      setCurrentGenre(genre);
      setShownMainSection("genre");
    }
  }

  const FavouritesAdd = (newTrack) => {
    setFavouriteTracks([...favouriteTracks, newTrack]);
  }

  const FavouritesRemove = (track) => {
    setFavouriteTracks(favouriteTracks.filter((item) => item !== track));
  }

  const QueueAdd = (newTrack) => {
    setQueueTracks([...queueTracks, newTrack]);
  }

  const QueueRemove = (track) => {
    setQueueTracks(queueTracks.filter((item) => item !== track));
  }

  const HandleActionPopup = (message) => {
    setActionPopupMessage(message);
    setActionPopup(true);
  }

  return (
    <>
      <PopupMenu
        setShownPopupMenu={setShownPopupMenu}
        shownPopupMenu={shownPopupMenu /* Slouží i jako props.visible, viz. PopupMenu */}/>

      <div id={"grid-container"}>
        <NavBar id={"nav-bar"}>
          <BurgerButton visible={!isSideBarVisible} onPress={() => setIsSideBarVisible(!isSideBarVisible)}/>
          <SearchBar
            setShownMainSection={setShownMainSection}
            setSearchedResults={setSearchedResults}
            allSongs={allSongs}
            setAllSongs={setAllSongs}/>
        </NavBar>

        <SideBar
          id={"side-bar"}
          setShownMainSection={setShownMainSection}
          isSideBarVisible={isSideBarVisible}
          setIsSideBarVisible={setIsSideBarVisible}
        />

        <ThemeProvider theme={ThemeSongsList}>
          <MainSection
            id={"main-section"}
            show={shownMainSection}
            setShownPopupMenu={setShownPopupMenu}
            searchedResults={searchedResults}
            setCurrent={setCurrent}
            current={current}
            HandleArtistSelection={HandleArtistSelection}
            currentArtist={currentArtist}
            HandleGenreSelection={HandleGenreSelection}
            currentGenre={currentGenre}
            allSongs={allSongs}
            FavouritesAdd={FavouritesAdd}
            FavouritesRemove={FavouritesRemove}
            favouriteTracks={favouriteTracks}
            QueueAdd={QueueAdd}
            QueueRemove={QueueRemove}
            queueTracks={queueTracks}
            HandleActionPopup={HandleActionPopup}
          />
        </ThemeProvider>

        <Footer id={"footer-player"}>
          <AudioPlayer current={current} />
        </Footer>
      </div>

      <Snackbar
        open={actionPopup}
        onClose={() => setActionPopup(false)}
        message={actionPopupMessage}
        autoHideDuration={1000}
      />
    </>
  )
}

export default FrameLayout