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

  const [searchedResults, setSearchedResults] = useState({ tracks: [], genres: [], artists: [] });
  const [current, setCurrent] = useState(null);

  return (
    <>

      <PopupMenu
        setShownPopupMenu={setShownPopupMenu}
        shownPopupMenu={shownPopupMenu /* Slouží i jako props.visible, viz. PopupMenu */}/>

      <div id={"grid-container"}>

        <NavBar id={"nav-bar"}>
          <BurgerButton visible={!isSideBarVisible} onPress={() => setIsSideBarVisible(!isSideBarVisible)}/>
          <SearchBar setShownMainSection={setShownMainSection} setSearchedResults={setSearchedResults} />
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