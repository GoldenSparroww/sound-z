import "../style/FrameLayout.css"
import BurgerButton from "./BurgerButton.jsx";
import {useState} from "react";

function FrameLayout() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div id={"grid-container"}>
      <div id={"nav-bar"}>nav
        <BurgerButton visible={!isVisible} onPress={() => setIsVisible(!isVisible)} />
      </div>
      <div id={"side-bar"} className={isVisible ? "show" : ""}>
        <BurgerButton visible={isVisible} onPress={() => setIsVisible(!isVisible)} />
        side
      </div>
      <div id={"main-section"}>main</div>
      <div id={"footer-player"}>footer</div>
    </div>
  )
}

export default FrameLayout