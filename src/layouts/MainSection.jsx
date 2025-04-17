import HomePage from './HomePage.jsx'
import SearchResults from "./SearchResults.jsx";

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
  } else if (props.show === "search-results") {
  return (
    <div id={"main-section"}>
      <SearchResults current={props.current} setCurrent={props.setCurrent} searchedResults={props.searchedResults} />
    </div>
  )
}
}

export default MainSection;