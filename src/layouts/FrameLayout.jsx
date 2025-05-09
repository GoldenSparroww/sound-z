import "../style/layout/FrameLayout.css"
import BurgerButton from "../components/BurgerButton.jsx";
import React, {useEffect, useState} from "react";
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
import {IsEmptyObject} from "../logic/TestInput.js";

const FrameLayout = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [shownMainSection, setShownMainSection] = useState("homepage");
  const [shownPopupMenu, setShownPopupMenu] = useState(null);

  const [allSongs, setAllSongs] = useState([]);
  const [searchedResults, setSearchedResults] = useState({ tracks: [], genres: [], artists: [] });

  const [current, setCurrent] = useState({}); /* URL of current track */
  /* abych na to nezapomel... "zavadejici nazvy" - current a currentAuthor/currentGenre maji jine vyznamy */
  /* current je pro aktualni prehravanou hudbu a currentAuthor/currentGenre je pro komponentu SearchResults */
  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const [favouriteTracks, setFavouriteTracks] = useState([]);

  const [immediateFollowingTracks, setImmediateFollowingTracks] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [queueTracksMap, setQueueTracksMap] = useState([]);

  const [actionPopup, setActionPopup] = useState(false);
  const [actionPopupMessage, setActionPopupMessage] = useState("");
  const [actionPopupDuration, setActionPopupDuration] = useState(1000)

  const [recentTracks, setRecentTracks] = useState([])

  const [playlists, setPlaylists] = useState([]);

  const ChangeMainSection = (section, isPlaylist = false) => {
    if (!isPlaylist) {
      setShownMainSection(section);
    } else {
      setShownMainSection("playlists");
      setCurrentPlaylist(section);
    }
  }

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

  /*-----------------------------------------------------------------------------------------*/
  const FavouritesAdd = (newTrack) => {
    setFavouriteTracks([...favouriteTracks, newTrack]);
  }

  const FavouritesRemove = (track) => {
    setFavouriteTracks(favouriteTracks.filter((item) => item !== track));
  }

  /*-----------------------------------------------------------------------------------------*/
  /* Kvuli asynchornim zmenam stavu immediateFollowingTracks, activeList musim pouzit useEffect jinak nesiham zmeny */
  useEffect(() => {
    setQueueTracksMap([
      ...immediateFollowingTracks.map(() => "immediateItem"),
      ...activeList.map(() => "acitveListItem")
    ])
  }, [immediateFollowingTracks, activeList])

  const ChangeActiveList = (index, list) => {
    setActiveIndex(index);
    setActiveList(list);
  }

  const AddImmediateFollowingTracks = (newTracks) => {
    if (IsEmptyObject(current)) {
      if (Array.isArray(newTracks) && newTracks.length > 0) {
        setCurrent(newTracks[0]);
        setImmediateFollowingTracks([
          ...immediateFollowingTracks,
          ...newTracks.slice(1)
        ]);
      } else {
        setCurrent(newTracks);
      }
    } else {
      setImmediateFollowingTracks([
        ...immediateFollowingTracks,
        ...(Array.isArray(newTracks) ? newTracks : [newTracks])
      ]);
    }
  }

  /*const RefreshQueuePlaylist = (list) => {
    setActiveList(list);
  }*/

  /*-----------------------------------------------------------------------------------------*/
  const HandleActionPopup = (message, duration = 1000) => {
    setActionPopupMessage(message);
    setActionPopupDuration(duration);
    setActionPopup(true);
  }

  useEffect(() => {
    if (IsEmptyObject(current)) return;

    if (recentTracks.some((track) => track.id === current.id)) return;

    if (recentTracks.length + 1 > 10) {
      setRecentTracks([
        ...recentTracks.slice(1, 10),
        current
      ]);
    } else {
      setRecentTracks([
        ...recentTracks,
        current
      ])
    }

  }, [current]);

  return (
    <>
      <PopupMenu
        setShownPopupMenu={setShownPopupMenu}
        shownPopupMenu={shownPopupMenu /* Slouží i jako props.visible, viz. PopupMenu */}
        playlists={playlists}
        currentPlaylist={currentPlaylist}
        setPlaylists={setPlaylists}
        setCurrentPlaylist={setCurrentPlaylist}
        setShownMainSection={setShownMainSection}
      />

      <div id={"grid-container"}>
        <NavBar id={"nav-bar"}>
          <BurgerButton visible={!isSideBarVisible} onPress={() => setIsSideBarVisible(!isSideBarVisible)}/>
          <SearchBar
            ChangeMainSection={ChangeMainSection}
            setSearchedResults={setSearchedResults}
            allSongs={allSongs}
            setAllSongs={setAllSongs}/>
        </NavBar>

        <SideBar
          id={"side-bar"}
          ChangeMainSection={ChangeMainSection}
          isSideBarVisible={isSideBarVisible}
          setIsSideBarVisible={setIsSideBarVisible}
          playlists={playlists}
          setPlaylists={setPlaylists}
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
            activeList={activeList}
            immediateFollowingTracks={immediateFollowingTracks}
            ChangeActiveList={ChangeActiveList}
            AddImmediateFollowingTracks={AddImmediateFollowingTracks}
            activeIndex={activeIndex}
            //RefreshQueuePlaylist={RefreshQueuePlaylist}
            HandleActionPopup={HandleActionPopup}
            playlists={playlists}
            setPlaylists={setPlaylists}
            currentPlaylist={currentPlaylist}
            shownMainSection={shownMainSection}
            setShownMainSection={setShownMainSection}
            recentTracks={recentTracks}
          />
        </ThemeProvider>

        <Footer id={"footer-player"}>
          <AudioPlayer
            current={current}
            setCurrent={setCurrent}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            activeList={activeList}
            setActiveList={setActiveList}
            immediateFollowingTracks={immediateFollowingTracks}
            setImmediateFollowingTracks={setImmediateFollowingTracks}
            queueTracksMap={queueTracksMap}
          />
        </Footer>
      </div>

      <Snackbar
        open={actionPopup}
        onClose={() => {
          setActionPopup(false);
          setActionPopupDuration(1000);
        }}
        message={actionPopupMessage}
        autoHideDuration={actionPopupDuration}
        key={actionPopupMessage}
      />
    </>
  )
}

export default FrameLayout