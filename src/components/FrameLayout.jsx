import "../style/FrameLayout.css"
import BurgerButton from "./BurgerButton.jsx";
import {useState} from "react";

function FrameLayout() {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  return (
    <div id={"grid-container"}>
      <div id={"nav-bar"}>nav
        <BurgerButton visible={!isSideBarVisible} onPress={() => setIsSideBarVisible(!isSideBarVisible)} />
      </div>
      <div id={"side-bar"} className={isSideBarVisible ? "show" : ""}>
        <BurgerButton visible={isSideBarVisible} onPress={() => setIsSideBarVisible(!isSideBarVisible)} />
        side
      </div>
      <div id={"main-section"}>main</div>
      <div id={"footer-player"}>footer</div>
    </div>
  )
}

export default FrameLayout