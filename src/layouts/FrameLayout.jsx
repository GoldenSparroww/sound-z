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
  const [favouriteTracks, setFavouriteTracks] = useState([
    {
      "id": 13,
      "name": "Deadlocked",
      "artist": "F-777",
      "genre": "Electronic",
      "file": "F-777 - Deadlocked.mp3",
      "image": "image (13).jpg",
      "duration": 206,
      "url": "http://localhost/music/F-777 - Deadlocked.mp3"
    },
    {
      "id": 12,
      "name": "Dance of The Violins",
      "artist": "F-777",
      "genre": "Electronic",
      "file": "F-777 - Dance of The Violins.mp3",
      "image": "image (12).jpg",
      "duration": 335,
      "url": "http://localhost/music/F-777 - Dance of The Violins.mp3"
    },
    {
      "id": 2,
      "name": "7 Years Old",
      "artist": "Lukas Graham",
      "genre": "Pop",
      "file": "7 Years Old.mp3",
      "image": "image (2).jpg",
      "duration": 239,
      "url": "http://localhost/music/7 Years Old.mp3"
    },
    {
      "id": 4,
      "name": "Amadeus",
      "artist": "Copyright Free Music",
      "genre": "Classical",
      "file": "Copyright Free Music - Amadeus.mp3",
      "image": "image (4).jpg",
      "duration": 242,
      "url": "http://localhost/music/Copyright Free Music - Amadeus.mp3"
    },
    {
      "id": 8,
      "name": "Bad",
      "artist": "David Guetta",
      "genre": "Dubstep",
      "file": "David Guetta - Bad.mp3",
      "image": "image (8).jpg",
      "duration": 171,
      "url": "http://localhost/music/David Guetta - Bad.mp3"
    }
  ]);

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
  const [recentTracks, setRecentTracks] = useState(
    [
      {
        "id": 2,
        "name": "7 Years Old",
        "artist": "Lukas Graham",
        "genre": "Pop",
        "file": "7 Years Old.mp3",
        "image": "image (2).jpg",
        "duration": 239,
        "url": "http://localhost/music/7 Years Old.mp3"
      },
      {
        "id": 1,
        "name": "Donuts [Bass Boosted - HQ]",
        "artist": "2SCOOPS",
        "genre": "Bass Boosted",
        "file": "2SCOOPS - Donuts [Bass Boosted - HQ].mp3",
        "image": "image_1.jpg",
        "duration": 180,
        "url": "http://localhost/music/2SCOOPS - Donuts [Bass Boosted - HQ].mp3"
      },
      {
        "id": 12,
        "name": "Dance of The Violins",
        "artist": "F-777",
        "genre": "Electronic",
        "file": "F-777 - Dance of The Violins.mp3",
        "image": "image (12).jpg",
        "duration": 335,
        "url": "http://localhost/music/F-777 - Dance of The Violins.mp3"
      },
      {
        "id": 13,
        "name": "Deadlocked",
        "artist": "F-777",
        "genre": "Electronic",
        "file": "F-777 - Deadlocked.mp3",
        "image": "image (13).jpg",
        "duration": 206,
        "url": "http://localhost/music/F-777 - Deadlocked.mp3"
      },
      {
        "id": 14,
        "name": "The Seven Seas",
        "artist": "F-777",
        "genre": "Electronic",
        "file": "F-777 - The Seven Seas.mp3",
        "image": "image (14).jpg",
        "duration": 143,
        "url": "http://localhost/music/F-777 - The Seven Seas.mp3"
      },
      {
        "id": 4,
        "name": "Amadeus",
        "artist": "Copyright Free Music",
        "genre": "Classical",
        "file": "Copyright Free Music - Amadeus.mp3",
        "image": "image (4).jpg",
        "duration": 242,
        "url": "http://localhost/music/Copyright Free Music - Amadeus.mp3"
      },
      {
        "id": 11,
        "name": "Pentakill",
        "artist": "Different Heaven",
        "genre": "Electronic",
        "file": "Different Heaven - Pentakill.mp3",
        "image": "image (11).jpg",
        "duration": 212,
        "url": "http://localhost/music/Different Heaven - Pentakill.mp3"
      },
      {
        "id": 10,
        "name": "My Heart",
        "artist": "Different Heaven",
        "genre": "Electronic",
        "file": "Different Heaven - My Heart.mp3",
        "image": "image (10).jpg",
        "duration": 267,
        "url": "http://localhost/music/Different Heaven - My Heart.mp3"
      },
      {
        "id": 7,
        "name": "Raabta",
        "artist": "CryJaxx",
        "genre": "Electronic",
        "file": "CryJaxx - Raabta.mp3",
        "image": "image (7).jpg",
        "duration": 183,
        "url": "http://localhost/music/CryJaxx - Raabta.mp3"
      },
      {
        "id": 6,
        "name": "SP1CE - Shockwave",
        "artist": "Copyright Free Music",
        "genre": "Electronic",
        "file": "Copyright Free Music - SP1CE - Shockwave.mp3",
        "image": "image (6).jpg",
        "duration": 184,
        "url": "http://localhost/music/Copyright Free Music - SP1CE - Shockwave.mp3"
      }
    ]
  )

  // obsahuje list playlistu
  const [playlists, setPlaylists] = useState([
    {
      "id": 0,
      "name": "Scary ghost",
      "image": "http://localhost/userdata/myuser/playlists/0.jpg?t=1748625320619",
      "description": "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
      "songs": [
        {
          "id": 1,
          "name": "Donuts [Bass Boosted - HQ]",
          "artist": "2SCOOPS",
          "genre": "Bass Boosted",
          "file": "2SCOOPS - Donuts [Bass Boosted - HQ].mp3",
          "image": "image_1.jpg",
          "duration": 180,
          "url": "http://localhost/music/2SCOOPS - Donuts [Bass Boosted - HQ].mp3"
        },
        {
          "id": 2,
          "name": "7 Years Old",
          "artist": "Lukas Graham",
          "genre": "Pop",
          "file": "7 Years Old.mp3",
          "image": "image (2).jpg",
          "duration": 239,
          "url": "http://localhost/music/7 Years Old.mp3"
        },
        {
          "id": 3,
          "name": "Boom - How Do You Do (C. Baumann Remix)",
          "artist": "Vengaboys",
          "genre": "Eurodance",
          "file": "Boom - How Do You Do (C. Baumann Remix).mp3",
          "image": "image (3).jpg",
          "duration": 214,
          "url": "http://localhost/music/Boom - How Do You Do (C. Baumann Remix).mp3"
        },
        {
          "id": 4,
          "name": "Amadeus",
          "artist": "Copyright Free Music",
          "genre": "Classical",
          "file": "Copyright Free Music - Amadeus.mp3",
          "image": "image (4).jpg",
          "duration": 242,
          "url": "http://localhost/music/Copyright Free Music - Amadeus.mp3"
        },
        {
          "id": 5,
          "name": "Bumpy Sax",
          "artist": "Copyright Free Music",
          "genre": "Smooth Jazz",
          "file": "Copyright Free Music - Bumpy Sax.mp3",
          "image": "image (5).jpg",
          "duration": 243,
          "url": "http://localhost/music/Copyright Free Music - Bumpy Sax.mp3"
        }
      ]
    },
    {
      "id": 1,
      "name": "Summer vibes",
      "image": "http://localhost/userdata/myuser/playlists/1.jpg?t=1748625374676",
      "description": "",
      "songs": [
        {
          "id": 11,
          "name": "Pentakill",
          "artist": "Different Heaven",
          "genre": "Electronic",
          "file": "Different Heaven - Pentakill.mp3",
          "image": "image (11).jpg",
          "duration": 212,
          "url": "http://localhost/music/Different Heaven - Pentakill.mp3"
        },
        {
          "id": 12,
          "name": "Dance of The Violins",
          "artist": "F-777",
          "genre": "Electronic",
          "file": "F-777 - Dance of The Violins.mp3",
          "image": "image (12).jpg",
          "duration": 335,
          "url": "http://localhost/music/F-777 - Dance of The Violins.mp3"
        },
        {
          "id": 13,
          "name": "Deadlocked",
          "artist": "F-777",
          "genre": "Electronic",
          "file": "F-777 - Deadlocked.mp3",
          "image": "image (13).jpg",
          "duration": 206,
          "url": "http://localhost/music/F-777 - Deadlocked.mp3"
        },
        {
          "id": 14,
          "name": "The Seven Seas",
          "artist": "F-777",
          "genre": "Electronic",
          "file": "F-777 - The Seven Seas.mp3",
          "image": "image (14).jpg",
          "duration": 143,
          "url": "http://localhost/music/F-777 - The Seven Seas.mp3"
        },
        {
          "id": 15,
          "name": "Close [Brooks Remix]",
          "artist": "IZECOLD",
          "genre": "Electronic",
          "file": "IZECOLD - Close [Brooks Remix].mp3",
          "image": "image (15).jpg",
          "duration": 231,
          "url": "http://localhost/music/IZECOLD - Close [Brooks Remix].mp3"
        },
        {
          "id": 16,
          "name": "Close",
          "artist": "IZECOLD",
          "genre": "Electronic",
          "file": "IZECOLD - Close.mp3",
          "image": "image (16).jpg",
          "duration": 282,
          "url": "http://localhost/music/IZECOLD - Close.mp3"
        },
        {
          "id": 17,
          "name": "I Love It",
          "artist": "Icona Pop",
          "genre": "Electronic",
          "file": "Icona Pop - I Love It.mp3",
          "image": "image (17).jpg",
          "duration": 180,
          "url": "http://localhost/music/Icona Pop - I Love It.mp3"
        },
        {
          "id": 6,
          "name": "SP1CE - Shockwave",
          "artist": "Copyright Free Music",
          "genre": "Electronic",
          "file": "Copyright Free Music - SP1CE - Shockwave.mp3",
          "image": "image (6).jpg",
          "duration": 184,
          "url": "http://localhost/music/Copyright Free Music - SP1CE - Shockwave.mp3"
        }
      ]
    }
  ]);

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