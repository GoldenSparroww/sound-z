import "../style/layout/FrameLayout.css"
import React, {useEffect, useState} from "react";
import MainSection from "./MainSection.jsx";
import SideBar from "./SideBar.jsx";
import PopupMenu from "../components/PopupMenu.jsx";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import ThemeSongsList from "../global/ThemeSongsList.js";
import {ThemeProvider} from "@mui/material/styles";
import {Snackbar} from "@mui/material";
import {IsEmptyObject} from "../logic/TestInput.js";

const FrameLayout = () => {
  // obsluha bocniho menu, hlavni sekce a popup menu
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [shownMainSection, setShownMainSection] = useState("homepage");
  const [shownPopupMenu, setShownPopupMenu] = useState(null);

  // list objektu vsech dostupnych pisnicek
  const [allSongs, setAllSongs] = useState([]);
  // objekt listů pro hledani
  const [searchedResults, setSearchedResults] = useState({ tracks: [], genres: [], artists: [] });

  const [current, setCurrent] = useState({}); /* URL of current track */
  /* abych na to nezapomel... "zavadejici nazvy" - current a currentAuthor/currentGenre maji jine vyznamy */
  /* current je pro aktualni prehravanou hudbu a currentAuthor/currentGenre je pro komponentu SearchResults */
  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  // udrzuje list objektu toho co je v oblibenych
  const [favouriteTracks, setFavouriteTracks] = useState([]);

  // udrzuje list objektu hudby, ktera bezprostredne nasleduje ve fronte - manualne pridana
  const [immediateFollowingTracks, setImmediateFollowingTracks] = useState([]);
  // obsahuje kompletni list prostoru, kde bylo kliknuto na posledni skladbu
  const [activeList, setActiveList] = useState([]);
  // index huby v ramci ulozeneho seznamu
  const [activeIndex, setActiveIndex] = useState(0);
  // symbolicka mapa fronty, udrzuje seznam dvou druhu slov, kde jedno rika ze ve fronte jsou nejaky pocty manualne pridane hudby
  // a nejaky konkretni list (manualne pridane se odmazavaji, automaticky ne)
  // slouzi pro detekci vypisu fronty
  const [queueTracksMap, setQueueTracksMap] = useState([]);

  // stavy pro obsluhu vyskakovaciho oznameni
  const [actionPopup, setActionPopup] = useState(false);
  const [actionPopupMessage, setActionPopupMessage] = useState("");
  const [actionPopupDuration, setActionPopupDuration] = useState(1000)

  //obsahuje list objektu poslednich 10 prehranych skladeb
  const [recentTracks, setRecentTracks] = useState([])

  // obsahuje list playlistu
  const [playlists, setPlaylists] = useState([]);

  const [loop, setLoop] = useState(false);
  const [randomPlay, setRandomPlay] = useState(false)
  const [tmpPlaylistInOrder, setTmpPlaylistInOrder] = useState([])

  /*-----------------------------------------------------------------------------------------*/

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
  // aktualizace mapy fronty
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

  /*-----------------------------------------------------------------------------------------*/
  const HandleActionPopup = (message, duration = 1000) => {
    setActionPopupMessage(message);
    setActionPopupDuration(duration);
    setActionPopup(true);
  }

  const HandleRandomPlay = (boolVal) => {
    const shuffled = structuredClone(activeList).filter((track) => (track.id !== current.id));

    if (boolVal) {
      // Zamichani playlistu
      for (let i = shuffled.length - 1; i > 0; i--) {
        // Vyberu náhodný index mezi 0 a i (včetně)
        const j = Math.floor(Math.random() * (i + 1));

        // Prohodim prvky na indexech i a j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      shuffled.unshift(current);

      setTmpPlaylistInOrder(activeList);
      ChangeActiveList(0, shuffled);
    } else {
      // vrácení playlistu do původního stavu
      // najde index toho, co teď hraje, v původním playlistu
      const newIndex = tmpPlaylistInOrder.findIndex((track) => (track.id === current.id));
      // nastaví index toho, co teď hraje a seřazený tehdejší playlist
      ChangeActiveList(newIndex, tmpPlaylistInOrder);
    }

    setRandomPlay(boolVal);
  }

  // aktualizace posledni prehrane hudby
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
        HandleActionPopup={HandleActionPopup}
      />

      <div id={"grid-container"}>
        <NavBar
          id={"nav-bar"}
          isSideBarVisible={isSideBarVisible}
          setIsSideBarVisible={setIsSideBarVisible}
          ChangeMainSection={ChangeMainSection}
          setSearchedResults={setSearchedResults}
          allSongs={allSongs}
          setAllSongs={setAllSongs}
          HandleActionPopup={HandleActionPopup}
        >
        </NavBar>

        <SideBar
          id={"side-bar"}
          ChangeMainSection={ChangeMainSection}
          isSideBarVisible={isSideBarVisible}
          setIsSideBarVisible={setIsSideBarVisible}
          playlists={playlists}
          setPlaylists={setPlaylists}
          HandleActionPopup={HandleActionPopup}
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
            setImmediateFollowingTracks={setImmediateFollowingTracks}
            immediateFollowingTracks={immediateFollowingTracks}
            ChangeActiveList={ChangeActiveList}
            AddImmediateFollowingTracks={AddImmediateFollowingTracks}
            activeIndex={activeIndex}
            HandleActionPopup={HandleActionPopup}
            playlists={playlists}
            setPlaylists={setPlaylists}
            currentPlaylist={currentPlaylist}
            shownMainSection={shownMainSection}
            setShownMainSection={setShownMainSection}
            recentTracks={recentTracks}
          />
        </ThemeProvider>

        <Footer
          id={"footer-player"}
          current={current}
          setCurrent={setCurrent}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          activeList={activeList}
          setActiveList={setActiveList}
          immediateFollowingTracks={immediateFollowingTracks}
          setImmediateFollowingTracks={setImmediateFollowingTracks}
          queueTracksMap={queueTracksMap}
          loop={loop}
          setLoop={setLoop}
          randomPlay={randomPlay}
          HandleRandomPlay={HandleRandomPlay}
        />
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