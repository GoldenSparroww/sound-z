import {ThemeProvider} from "@mui/material/styles";
import themeSideBar from "../global/ThemeSideBar.js";
import NestedList from "../components/NestedList.jsx";

const SideBar = (props) => {
  return (
    <div id={props.id} className={props.isSideBarVisible ? "show" : ""}>

      <ThemeProvider theme={themeSideBar}>
        <NestedList
          ChangeMainSection={props.ChangeMainSection}
          playlists={props.playlists}
          setPlaylists={props.setPlaylists}
          HandleActionPopup={props.HandleActionPopup}
          isSideBarVisible={props.isSideBarVisible}
          setIsSideBarVisible={props.setIsSideBarVisible}
        />
      </ThemeProvider>
    </div>
  )
}

export default SideBar;