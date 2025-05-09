import BurgerButton from "../components/BurgerButton.jsx";
import {ThemeProvider} from "@mui/material/styles";
import themeSideBar from "../global/ThemeSideBar.js";
import NestedList from "../components/NestedList.jsx";

const SideBar = (props) => {
  return (
    <div id={props.id} className={props.isSideBarVisible ? "show" : ""}>
      <BurgerButton
        isSideBarVisible={props.isSideBarVisible}
        setIsSideBarVisible={props.setIsSideBarVisible}
      />
      <ThemeProvider theme={themeSideBar}>
        <NestedList
          ChangeMainSection={props.ChangeMainSection}
          playlists={props.playlists}
          setPlaylists={props.setPlaylists}
          HandleActionPopup={props.HandleActionPopup}
        />
      </ThemeProvider>
    </div>
  )
}

export default SideBar;