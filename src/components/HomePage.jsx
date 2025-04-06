import "../style/HomePage.css"

const HomePage = () => {
  return (
    <div id={'home-page-container'}>
      <div id={"tile-recently-played"}>tile-recently-played</div>
      <div className={"basic-tile"} id={"tile-settings"}>tile-settings</div>
      <div className={"basic-tile"} id={"tile-about"}>tile-about</div>
      <div className={"basic-tile"} id={"tile-help"}>tile-help</div>
    </div>
  )
}

export default HomePage;