import React from "react";
import '../style/layout/PopupMenuLayout.css'
import PopupEditPlaylist from "./PopupEditPlaylist.jsx";
import PopupRemovePlaylist from "./PopupRemovePlaylist.jsx";
import AboutTile from "./AboutTile.jsx";
import HelpTile from "./HelpTile.jsx";

const PopupMenu = (props) => {
  /*if (props.shownPopupMenu === "settings") {
    return (
      <>
        <div
          id={'popup-menu-background'}
          onClick={() => props.setShownPopupMenu(null)}>
        </div>

        <div
          id={'popup-menu-content'}
          className={'mui-like-border'}
        >
          {props.shownPopupMenu}
        </div>
      </>
    )
  } else*/ if (props.shownPopupMenu === "help") {
    return (
      <HelpTile
        setShownPopupMenu={props.setShownPopupMenu}
      />
    )
  } else if (props.shownPopupMenu === "about") {
    return (
      <AboutTile
        setShownPopupMenu={props.setShownPopupMenu}
      />
    )
  } else if (props.shownPopupMenu === "edit-playlist") {
    return (
      <PopupEditPlaylist
        setShownPopupMenu={props.setShownPopupMenu}
        shownPopupMenu={props.shownPopupMenu}
        playlists={props.playlists}
        currentPlaylist={props.currentPlaylist}
        setPlaylists={props.setPlaylists}
        setCurrentPlaylist={props.setCurrentPlaylist}
      />
    )
  } else if (props.shownPopupMenu === "remove-playlist") {
    return (
      <PopupRemovePlaylist
        setShownMa
        setShownPopupMenu={props.setShownPopupMenu}
        shownPopupMenu={props.shownPopupMenu}
        playlists={props.playlists}
        currentPlaylist={props.currentPlaylist}
        setPlaylists={props.setPlaylists}
        setCurrentPlaylist={props.setCurrentPlaylist}
        setShownMainSection={props.setShownMainSection}
      />
    )
  }
}

export default PopupMenu;