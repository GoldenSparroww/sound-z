import BurgerButton from "./BurgerButton.jsx";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../global/theme.js";
import NestedList from "./MUI-NestedList.jsx";

const SideBar = (props) => {
  return (
    <div id={"side-bar"} className={props.isSideBarVisible ? "show" : ""}>
      <BurgerButton visible={props.isSideBarVisible} onPress={() => props.setIsSideBarVisible(!props.isSideBarVisible)}/>
      <ThemeProvider theme={theme}>
        <NestedList changeMainSection={props.setShownMainSection}/>
      </ThemeProvider>
      side
    </div>
  )
}

export default SideBar;