import HomePage from './HomePage.jsx'
import SearchResults from "./SearchResults.jsx";
import ArtistPage from "./ArtistPage.jsx";
import GenrePage from "./GenrePage.jsx";

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
        <></>
      </div>
    )
  } else if (props.show === "search-results") {
    return (
      <div id={props.id}>
        <SearchResults
          current={props.current}
          setCurrent={props.setCurrent}
          allSongs={props.allSongs}
          searchedResults={props.searchedResults}
          HandleArtistSelection={props.HandleArtistSelection}
          HandleGenreSelection={props.HandleGenreSelection}
          FavouritesAdd={props.FavouritesAdd}
          FavouritesRemove={props.FavouritesRemove}
          favouriteTracks={props.favouriteTracks}
          QueueAdd={props.QueueAdd}
          QueueRemove={props.QueueRemove}
          queueTracks={props.queueTracks}
          HandleActionPopup={props.HandleActionPopup}
        />
      </div>
    )
  } else if (props.show === "artist") {
    return (
      <div id={props.id}>
        <ArtistPage
          currentArtist={props.currentArtist}
          current={props.current}
          setCurrent={props.setCurrent}
          allSongs={props.allSongs}
          FavouritesAdd={props.FavouritesAdd}
          FavouritesRemove={props.FavouritesRemove}
          favouriteTracks={props.favouriteTracks}
          QueueAdd={props.QueueAdd}
          QueueRemove={props.QueueRemove}
          queueTracks={props.queueTracks}
          HandleActionPopup={props.HandleActionPopup}
        />
      </div>
    )
  } else if (props.show === "genre") {
    return (
      <div id={props.id}>
        <GenrePage
          currentGenre={props.currentGenre}
          current={props.current}
          setCurrent={props.setCurrent}
          allSongs={props.allSongs}
          FavouritesAdd={props.FavouritesAdd}
          FavouritesRemove={props.FavouritesRemove}
          favouriteTracks={props.favouriteTracks}
          QueueAdd={props.QueueAdd}
          QueueRemove={props.QueueRemove}
          queueTracks={props.queueTracks}
          HandleActionPopup={props.HandleActionPopup}
        />
      </div>
    )
  }
}

export default MainSection;