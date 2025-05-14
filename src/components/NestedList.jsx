import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddBoxIcon from '@mui/icons-material/AddBox';

import Colors from '../global/Colors.js'
import {useEffect, useRef, useState} from "react";
import GetPlaylistAutomaticId from "../logic/GetPlaylistAutomaticId.js";
import GetPlaylistAutomaticName from "../logic/GetPlaylistAutomaticName.js";
import BurgerButton from "./BurgerButton.jsx";


export default function NestedList(props) {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");

  //---------------------------------------------------------------------------------
  // odkaz na kotvu na konci seznamu playlistů
  const playlistEndRef = useRef(null);
  // odkaz na predchozi pocet playlistu, abych mohl scrollovat jen kdyz bude pocet vetsi
  const prevPlaylistCountRef = React.useRef(Object.keys(props.playlists).length);

  // pro posunuti po pridani
  useEffect(() => {
    const currentCount = Object.keys(props.playlists).length;
    const prevCount = prevPlaylistCountRef.current;

    if (playlistEndRef.current && currentCount > prevCount) {
      //scrollIntoView je nativní JavaScript metoda (ne z Reactu), která je dostupná na každém DOM elementu
      playlistEndRef.current.scrollIntoView({ behavior: 'smooth' });

      prevPlaylistCountRef.current = currentCount;
    }
  }, [props.playlists]);
  //---------------------------------------------------------------------------------

  const handleCollapseMenuClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (section, isPlaylist = false) => {
    setSelectedSection(section);
    if (!isPlaylist) {
      props.ChangeMainSection(section);
    } else {
      props.ChangeMainSection(section, true);
    }
  };

  const handlePlaylistAdded = () => {
    if (props.playlists.length > 50) {
      props.HandleActionPopup(
        "Maximum number of playlists reached (50). " +
        "To add, delete at least one playlist.",
        5000
      )
      return;
    }

    const playlistAutomaticNameId = GetPlaylistAutomaticId(props.playlists);
    props.setPlaylists([
      ...props.playlists,
      {
        "id": playlistAutomaticNameId,
        "name": GetPlaylistAutomaticName(props.playlists),
        "image": "http://localhost/default/empty.png",
        "description": "",
        "songs": []
      }
    ]);
    handleListItemClick(playlistAutomaticNameId, true);
  }

  return (
    <List
      sx={{
        padding: '0',
        width: '100%',
        height: '100%',
        margin: "0",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemText
        sx={{
          margin: 0,
          display: "flex",
          flexDirection: 'row-reverse',
          alignItems: "flex-start",
          justifyContent: "flex-start",
          "@media (max-width: 1000px)": {
            padding: "2rem 1rem 1rem 1rem",
          }
        }}
      >
        <BurgerButton
          isSideBarVisible={props.isSideBarVisible}
          setIsSideBarVisible={props.setIsSideBarVisible}
        />
      </ListItemText>
      <ListItemButton
        selected={selectedSection === "homepage"}
        onClick={() => handleListItemClick("homepage")}
      >
        <ListItemIcon>
          <HomeIcon sx={{ fontSize: '3rem', padding: "0 1rem 0 0" }}/>
        </ListItemIcon>
        <ListItemText primary="Home Page"/>
      </ListItemButton>

      <ListItemButton
        selected={selectedSection === "queue"}
        onClick={() => handleListItemClick("queue")}
      >
        <ListItemIcon>
          <LayersIcon sx={{ fontSize: '3rem', padding: "0 1rem 0 0" }}/>
        </ListItemIcon>
        <ListItemText primary="Queue"/>
      </ListItemButton>

      <ListItemButton
        selected={selectedSection === "favourites"}
        onClick={() => handleListItemClick("favourites")}
      >
        <ListItemIcon>
          <FavoriteIcon sx={{ fontSize: '3rem', padding: "0 1rem 0 0" }} />
        </ListItemIcon>
        <ListItemText primary="Favorites"/>
      </ListItemButton>

      <ListItemButton
        onClick={() => handleCollapseMenuClick()}
      >
        <ListItemIcon>
          <QueueMusicIcon sx={{ fontSize: '3rem', padding: "0 1rem 0 0" }}/>
        </ListItemIcon>
        <ListItemText primary="Playlists"/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          sx={{
            maxHeight: '100%',
            bgcolor: Colors.color_side_bar_list,
            overflowY: 'auto',
            padding: 0,
          }}
          component="div"
          disablePadding>

          <ListItemButton
            sx={{pl: 6}}
            onClick={() => handlePlaylistAdded()}>
            <ListItemIcon>
              <AddBoxIcon sx={{ fontSize: '2rem', color: Colors.color_details}}/>
            </ListItemIcon>
            <ListItemText primary="Add a New Playlist"/>
          </ListItemButton>

          {props.playlists.map((playlist, idx) => (
            <ListItemButton
              key={idx}
              sx={{pl: 6, pr: 6}}
              selected={selectedSection === playlist["id"]}
              onClick={() => handleListItemClick(playlist["id"], true)}
            >
              <ListItemIcon>
                <div
                  style={{
                    width: '3rem',
                    height: '3rem'
                  }}
                >
                  <img
                    className={"img-in-list"}
                    src={playlist["image"]}
                    alt={"Image Preview"}
                    style={{
                      borderRadius: '5px'
                    }}/>
                </div>
              </ListItemIcon>
              <ListItemText
                slotProps={{
                  primary: {
                    sx: {
                      pl: "1rem",
                      overflow: "hidden",
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }
                  },
                  secondary: {
                    sx: {
                      pl: "1rem",
                      overflow: "hidden",
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }
                  }
                }}
                primary={playlist["name"]}
                secondary={playlist["description"]}/>
            </ListItemButton>
          ))}

          {/* Kotva pro scrollovani pri vytvoreni */}
          <div ref={playlistEndRef}></div>

        </List>
      </Collapse>
    </List>
  );
}
