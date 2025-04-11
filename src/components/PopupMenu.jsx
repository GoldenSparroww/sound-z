import React from "react";
import '../style/layout/PopupMenuLayout.css'

const PopupMenu = (props) => {
  if (props.shownPopupMenu !== null) {
    return (
      <>
        <div
          id={'popup-menu-background'}
          onClick={() => props.setShownPopupMenu(null)}
        ></div>

        <div
          id={'popup-menu-content'}
        >{props.shownPopupMenu}</div>
      </>
    )
  } else {
    return (<></>)
  }

}

export default PopupMenu;