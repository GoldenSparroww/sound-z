import BurgerButton from "../components/BurgerButton.jsx";
import SearchBar from "../components/SearchBar.jsx";
import React from "react";
import "../style/layout/NavBarLayout.css"
import {ThemeProvider} from "@mui/material/styles";
import themeSearchBar from "../global/ThemeSearchBar.js";

const NavBar = (props) => {

  return (
    <div id={props.id}>
      <ThemeProvider theme={themeSearchBar}>
        <div id={"burger-button-container"} className={"side-div"}>
          <BurgerButton
            isSideBarVisible={props.isSideBarVisible}
            setIsSideBarVisible={props.setIsSideBarVisible}
          />
        </div>
        <SearchBar
          ChangeMainSection={props.ChangeMainSection}
          setSearchedResults={props.setSearchedResults}
          allSongs={props.allSongs}
          setAllSongs={props.setAllSongs}
          HandleActionPopup={props.HandleActionPopup}
        />
        <div id={"burger-button-container"} className={"side-div"}>
          <div id={"placeholder"} />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default NavBar;