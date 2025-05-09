import "../style/layout/HomePageLayout.css"
import Tile from "../components/Tile.jsx"
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import TrackCard from "../components/TrackCard.jsx";
import Colors from "../global/Colors.js";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {ThemeProvider} from "@mui/material/styles";
import themeRecentlyPlayed from "../global/ThemeRecentlyPlayed.js";
import {useEffect, useRef} from "react";

const HomePage = (props) => {

  // princip posunu horziontalne
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault(); // zamezí vertikálnímu scrollu
      el.scrollLeft += e.deltaY;
    };

    // kvuli tomu ze onwheel by zpusobovalo problemy
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div id={'home-page-container'}>

      {props.recentTracks.length > 0 && (
        <div id={"tile-recently-played-container"} ref={scrollRef} >
          <div id={"header-container"}>
            <Typography sx={{color: Colors.color_text}} gutterBottom variant="h4" component="div">
              Recently Played Tracks
            </Typography>
          </div>
          <ThemeProvider theme={themeRecentlyPlayed}>
            <div id={"tracks-container"}>
              {/* slice bez argumentu vytvori melkou kopii a tu muzeme primo prevratit reverse() */}
              {props.recentTracks.slice().reverse().map((track, idx) => (
                <TrackCard
                  key={idx}
                  track={track}
                  recentTracks={props.recentTracks}
                  setCurrent={props.setCurrent}
                  current={props.current}
                  ChangeActiveList={props.ChangeActiveList}
                >
                </TrackCard>
              ))}
            </div>
          </ThemeProvider>
        </div>
      )}


      <Tile class={"basic-tile"} id={"tile-settings"} onClick={() => props.setShownPopupMenu('settings')}>
        <SettingsIcon sx={{fontSize: "8rem"}} />
        <span>Settings</span>
      </Tile>

      <Tile class={"basic-tile"} id={"tile-about"} onClick={() => props.setShownPopupMenu('about')}>
        <InfoIcon sx={{fontSize: "8rem"}}/>
        <span>About</span>
      </Tile>

      <Tile class={"basic-tile"} id={"tile-help"} onClick={() => props.setShownPopupMenu('help')}>
        <HelpIcon sx={{fontSize: "8rem"}}/>
        <span>Help</span>
      </Tile>

    </div>
  )
}

export default HomePage;