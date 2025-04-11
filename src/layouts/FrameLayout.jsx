import "../style/layout/FrameLayout.css"
import BurgerButton from "../components/BurgerButton.jsx";
import React, {useState} from "react";
import MainSection from "./MainSection.jsx";
import SideBar from "./SideBar.jsx";

const FrameLayout = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [shownMainSection, setShownMainSection] = useState("homepage");
  const [shownPopupMenu, setShownPopupMenu] = useState(null);

  return (
    <>
      <div id={'popup-menu-content'}>{shownPopupMenu}</div>

      <div id={"grid-container"}>
        <div id={"nav-bar"}>nav
          <BurgerButton visible={!isSideBarVisible} onPress={() => setIsSideBarVisible(!isSideBarVisible)}/>
        </div>

        {/* id={"side-bar"} */}
        <SideBar
          setShownMainSection={setShownMainSection}
          isSideBarVisible={isSideBarVisible}
          setIsSideBarVisible={setIsSideBarVisible}
        />

        {/* id={"main-section"} */}
        <MainSection
          show={shownMainSection}
          popupMenu={setShownPopupMenu}
        />

        <div id={"footer-player"}>footer</div>
      </div>
    </>
  )
}

export default FrameLayout