import HomePage from './HomePage.jsx'

const MainSection = (props) => {
  if (props.show === "homepage") {
    return (
      <div id={"main-section"}>
        <HomePage setShownPopupMenu={props.setShownPopupMenu} />
      </div>
    )
  } else if (props.show === "queue") {
    return (
      <div id={"main-section"}>queue1</div>
    )
  } else if (props.show === "favourites") {
    return (
      <div id={"main-section"}>favourites1</div>
    )
  }
}

export default MainSection;