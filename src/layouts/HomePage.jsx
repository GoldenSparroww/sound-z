import "../style/layout/HomePageLayout.css"
import "../style/components/Tiles.css"
import Tile from "../components/Tile.jsx"

const HomePage = () => {
  return (
    <div id={'home-page-container'}>

      <div id={"tile-recently-played"}>tile-recently-played</div>

      <Tile class={"basic-tile"} id={"tile-settings"}>
        tile-settings
      </Tile>

      <Tile class={"basic-tile"} id={"tile-about"}>
        tile-about
      </Tile>

      <Tile class={"basic-tile"} id={"tile-help"}>
        tile-help
      </Tile>

    </div>
  )
}

export default HomePage;