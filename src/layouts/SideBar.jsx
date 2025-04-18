import BurgerButton from "../components/BurgerButton.jsx";
import {ThemeProvider} from "@mui/material/styles";
import themeSideBar from "../global/ThemeSideBar.js";
import NestedList from "../components/NestedList.jsx";

const SideBar = (props) => {
  return (
    <div id={props.id} className={props.isSideBarVisible ? "show" : ""}>
      <BurgerButton visible={props.isSideBarVisible} onPress={() => props.setIsSideBarVisible(!props.isSideBarVisible)}/>
      <ThemeProvider theme={themeSideBar}>
        <NestedList changeMainSection={props.setShownMainSection}/>
      </ThemeProvider>
    </div>
  )
}

export default SideBar;