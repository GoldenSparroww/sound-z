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

const FrameLayout = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [shownMainSection, setShownMainSection] = useState("homepage");
  const [shownPopupMenu, setShownPopupMenu] = useState(null);

  const [allSongs, setAllSongs] = useState([]);
  const [searchedResults, setSearchedResults] = useState({ tracks: [], genres: [], artists: [] });

  const [current, setCurrent] = useState(null); /* URL of current track */
  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(null);

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
          />
        </ThemeProvider>

        <Footer id={"footer-player"}>
          <AudioPlayer current={current} />
        </Footer>

      </div>
    </>
  )
}

export default FrameLayout