import HomePage from './HomePage.jsx'
import SearchResults from "./SearchResults.jsx";

const MainSection = (props) => {
  if (props.show === "homepage") {
    return (
      <div id={props.id}>
        <HomePage setShownPopupMenu={props.setShownPopupMenu} />
      </div>
    )
  } else if (props.show === "queue") {
    return (
      <div id={props.id}>
        queue1
      </div>
    )
  } else if (props.show === "favourites") {
    return (
      <div id={props.id}>
        favourites1
      </div>
    )
  } else if (props.show === "search-results") {
    return (
      <div id={props.id}>
        <SearchResults current={props.current} setCurrent={props.setCurrent} searchedResults={props.searchedResults} />
      </div>
    )
  }
}

export default MainSection;