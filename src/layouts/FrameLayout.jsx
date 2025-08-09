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
      "id": 6,
      "name": "Don`t Talk",
      "artist": "Cosmonkey",
      "genre": "Drum & Bass",
      "file": "dont-talk-315229.mp3",
      "image": "image (7).jpg",
      "duration": 111,
      "url": "http://localhost/music/dont-talk-315229.mp3"
    },
    {
      "id": 7,
      "name": "So Fresh",
      "artist": "Cosmonkey",
      "genre": "Drum & Bass",
      "file": "so-fresh-315255.mp3",
      "image": "image (8).jpg",
      "duration": 97,
      "url": "http://localhost/music/so-fresh-315255.mp3"
    },
    {
      "id": 8,
      "name": "Gardens - Stylish Chill",
      "artist": "penguinmusic",
      "genre": "Ambient",
      "file": "gardens-stylish-chill-303261.mp3",
      "image": "image (9).jpg",
      "duration": 117,
      "url": "http://localhost/music/gardens-stylish-chill-303261.mp3"
    },
    {
      "id": 9,
      "name": "Kugelsicher",
      "artist": "TremoxBeatz",
      "genre": "Free type beat",
      "file": "kugelsicher-by-tremoxbeatz-302838.mp3",
      "image": "image (10).jpg",
      "duration": 157,
      "url": "http://localhost/music/kugelsicher-by-tremoxbeatz-302838.mp3"
    },
    {
      "id": 10,
      "name": "Dunkelheit",
      "artist": "TremoxBeatz",
      "genre": "Free type beat",
      "file": "dunkelheit-by-tremoxbeatz-311367.mp3",
      "image": "image (11).jpg",
      "duration": 170,
      "url": "http://localhost/music/dunkelheit-by-tremoxbeatz-311367.mp3"
    },
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
        "id": 3,
        "name": "EONA - Emotional Ambient Pop",
        "artist": "Rockot",
        "genre": "Ambient",
        "file": "eona-emotional-ambient-pop-351436.mp3",
        "image": "image (4).jpg",
        "duration": 152,
        "url": "http://localhost/music/eona-emotional-ambient-pop-351436.mp3"
      },
      {
        "id": 4,
        "name": "Jungle Waves (Drum&Bass Electronic Inspiring Promo)",
        "artist": "DIMMYSAD",
        "genre": "Drum & Bass",
        "file": "jungle-waves-drumampbass-electronic-inspiring-promo-345013.mp3",
        "image": "image (5).jpg",
        "duration": 132,
        "url": "http://localhost/music/jungle-waves-drumampbass-electronic-inspiring-promo-345013.mp3"
      },
      {
        "id": 5,
        "name": "Brain Implant (Cyberpunk Sci-Fi Trailer Action Intro)",
        "artist": "soundbay",
        "genre": "Drum & Bass",
        "file": "brain-implant-cyberpunk-sci-fi-trailer-action-intro-330416.mp3",
        "image": "image (6).jpg",
        "duration": 49,
        "url": "http://localhost/music/brain-implant-cyberpunk-sci-fi-trailer-action-intro-330416.mp3"
      },
      {
        "id": 6,
        "name": "Don`t Talk",
        "artist": "Cosmonkey",
        "genre": "Drum & Bass",
        "file": "dont-talk-315229.mp3",
        "image": "image (7).jpg",
        "duration": 111,
        "url": "http://localhost/music/dont-talk-315229.mp3"
      },
      {
        "id": 7,
        "name": "So Fresh",
        "artist": "Cosmonkey",
        "genre": "Drum & Bass",
        "file": "so-fresh-315255.mp3",
        "image": "image (8).jpg",
        "duration": 97,
        "url": "http://localhost/music/so-fresh-315255.mp3"
      },
      {
        "id": 8,
        "name": "Gardens - Stylish Chill",
        "artist": "penguinmusic",
        "genre": "Ambient",
        "file": "gardens-stylish-chill-303261.mp3",
        "image": "image (9).jpg",
        "duration": 117,
        "url": "http://localhost/music/gardens-stylish-chill-303261.mp3"
      },
      {
        "id": 9,
        "name": "Kugelsicher",
        "artist": "TremoxBeatz",
        "genre": "Free type beat",
        "file": "kugelsicher-by-tremoxbeatz-302838.mp3",
        "image": "image (10).jpg",
        "duration": 157,
        "url": "http://localhost/music/kugelsicher-by-tremoxbeatz-302838.mp3"
      },
      {
        "id": 10,
        "name": "Dunkelheit",
        "artist": "TremoxBeatz",
        "genre": "Free type beat",
        "file": "dunkelheit-by-tremoxbeatz-311367.mp3",
        "image": "image (11).jpg",
        "duration": 170,
        "url": "http://localhost/music/dunkelheit-by-tremoxbeatz-311367.mp3"
      },
      {
        "id": 11,
        "name": "Movement",
        "artist": "SoulProdMusic",
        "genre": "Breakbeat",
        "file": "movement-200697.mp3",
        "image": "image (12).jpg",
        "duration": 155,
        "url": "http://localhost/music/movement-200697.mp3"
      },
      {
        "id": 12,
        "name": "Sandbreaker",
        "artist": "Denys Brodovskyi",
        "genre": "Energic",
        "file": "sandbreaker-379630.mp3",
        "image": "image (1).jpg",
        "duration": 128,
        "url": "http://localhost/music/sandbreaker-379630.mp3"
      },
      {
        "id": 13,
        "name": "Private Party",
        "artist": "lucafrancini",
        "genre": "Corp",
        "file": "private-party-225212.mp3",
        "image": "image (13).jpg",
        "duration": 68,
        "url": "http://localhost/music/private-party-225212.mp3"
      },
      {
        "id": 14,
        "name": "Vampire Queen (Vocal Rap Hip-Hop)",
        "artist": "lucafrancini",
        "genre": "Corp ",
        "file": "vampire-queen-vocal-rap-hip-hop-213826.mp3",
        "image": "image (14).jpg",
        "duration": 177,
        "url": "http://localhost/music/vampire-queen-vocal-rap-hip-hop-213826.mp3"
      },
      {
        "id": 15,
        "name": "Chic Boutique",
        "artist": "lucafrancini",
        "genre": "Background",
        "file": "chic-boutique-203102.mp3",
        "image": "image (15).jpg",
        "duration": 163,
        "url": "http://localhost/music/chic-boutique-203102.mp3"
      },
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
          "name": "Tell Me What",
          "artist": "Denys Brodovskyi",
          "genre": "Energic",
          "file": "tell-me-what-379638.mp3",
          "image": "image (2).jpg",
          "duration": 161,
          "url": "http://localhost/music/tell-me-what-379638.mp3"
        },
        {
          "id": 2,
          "name": "Embrace",
          "artist": "Evgeny Bardyuzha",
          "genre": "Ambient",
          "file": "embrace-364091.mp3",
          "image": "image (3).jpg",
          "duration": 157,
          "url": "http://localhost/music/embrace-364091.mp3"
        },
        {
          "id": 3,
          "name": "EONA - Emotional Ambient Pop",
          "artist": "Rockot",
          "genre": "Ambient",
          "file": "eona-emotional-ambient-pop-351436.mp3",
          "image": "image (4).jpg",
          "duration": 152,
          "url": "http://localhost/music/eona-emotional-ambient-pop-351436.mp3"
        },
        {
          "id": 4,
          "name": "Jungle Waves (Drum&Bass Electronic Inspiring Promo)",
          "artist": "DIMMYSAD",
          "genre": "Drum & Bass",
          "file": "jungle-waves-drumampbass-electronic-inspiring-promo-345013.mp3",
          "image": "image (5).jpg",
          "duration": 132,
          "url": "http://localhost/music/jungle-waves-drumampbass-electronic-inspiring-promo-345013.mp3"
        },
        {
          "id": 5,
          "name": "Brain Implant (Cyberpunk Sci-Fi Trailer Action Intro)",
          "artist": "soundbay",
          "genre": "Drum & Bass",
          "file": "brain-implant-cyberpunk-sci-fi-trailer-action-intro-330416.mp3",
          "image": "image (6).jpg",
          "duration": 49,
          "url": "http://localhost/music/brain-implant-cyberpunk-sci-fi-trailer-action-intro-330416.mp3"
        },
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
          "name": "Movement",
          "artist": "SoulProdMusic",
          "genre": "Breakbeat",
          "file": "movement-200697.mp3",
          "image": "image (12).jpg",
          "duration": 155,
          "url": "http://localhost/music/movement-200697.mp3"
        },
        {
          "id": 12,
          "name": "Sandbreaker",
          "artist": "Denys Brodovskyi",
          "genre": "Energic",
          "file": "sandbreaker-379630.mp3",
          "image": "image (1).jpg",
          "duration": 128,
          "url": "http://localhost/music/sandbreaker-379630.mp3"
        },
        {
          "id": 13,
          "name": "Private Party",
          "artist": "lucafrancini",
          "genre": "Corp",
          "file": "private-party-225212.mp3",
          "image": "image (13).jpg",
          "duration": 68,
          "url": "http://localhost/music/private-party-225212.mp3"
        },
        {
          "id": 14,
          "name": "Vampire Queen (Vocal Rap Hip-Hop)",
          "artist": "lucafrancini",
          "genre": "Corp ",
          "file": "vampire-queen-vocal-rap-hip-hop-213826.mp3",
          "image": "image (14).jpg",
          "duration": 177,
          "url": "http://localhost/music/vampire-queen-vocal-rap-hip-hop-213826.mp3"
        },
        {
          "id": 15,
          "name": "Chic Boutique",
          "artist": "lucafrancini",
          "genre": "Background",
          "file": "chic-boutique-203102.mp3",
          "image": "image (15).jpg",
          "duration": 163,
          "url": "http://localhost/music/chic-boutique-203102.mp3"
        },
        {
          "id": 16,
          "name": "Heart Says Yes (Beautiful Romantic Piano)",
          "artist": "AlexGrohl",
          "genre": "Background",
          "file": "heart-says-yes-beautiful-romantic-piano-385509.mp3",
          "image": "image (16).jpg",
          "duration": 95,
          "url": "http://localhost/music/heart-says-yes-beautiful-romantic-piano-385509.mp3"
        },
        {
          "id": 17,
          "name": "Follow Your Heart (Uplifting Folk Acoustic)",
          "artist": "AlexGrohl",
          "genre": "Adventure",
          "file": "follow-your-heart-uplifting-folk-acoustic-385508.mp3",
          "image": "image (17).jpg",
          "duration": 180,
          "url": "http://localhost/music/follow-your-heart-uplifting-folk-acoustic-385508.mp3"
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