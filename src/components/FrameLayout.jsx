import "../style/FrameLayout.css"
import BurgerButton from "./BurgerButton.jsx";
import {useState} from "react";
import NestedList from "../components/MUI-NestedList.jsx";
import {ThemeProvider} from '@mui/material/styles';
import theme from '../global/theme.js';
import MainSection from "./MainSection.jsx";

const FrameLayout = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [shownMainSection, setShownMainSection] = useState("homepage");

  return (
    <div id={"grid-container"}>
      <div id={"nav-bar"}>nav
        <BurgerButton visible={!isSideBarVisible} onPress={() => setIsSideBarVisible(!isSideBarVisible)}/>
      </div>

      <div id={"side-bar"} className={isSideBarVisible ? "show" : ""}>
        <BurgerButton visible={isSideBarVisible} onPress={() => setIsSideBarVisible(!isSideBarVisible)}/>
        <ThemeProvider theme={theme}>
          <NestedList changeMainSection={setShownMainSection}/>
        </ThemeProvider>
        side
      </div>

      <MainSection show={shownMainSection}/>


      <div id={"footer-player"}>footer</div>
    </div>
  )
}

export default FrameLayout