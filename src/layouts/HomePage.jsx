import "../style/layout/HomePageLayout.css"
import Tile from "../components/Tile.jsx"

import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';

const HomePage = (props) => {

  return (
    <div id={'home-page-container'}>

      {/*DODELAT*/}
      <div id={"tile-recently-played"}>tile-recently-played</div>

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