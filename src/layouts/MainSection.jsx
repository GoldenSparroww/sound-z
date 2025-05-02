import HomePage from './HomePage.jsx'
import SearchResults from "./SearchResults.jsx";
import ArtistPage from "./ArtistPage.jsx";
import GenrePage from "./GenrePage.jsx";
import QueuePage from "./QueuePage.jsx";
import FavouritesPage from "./FavouritesPage.jsx";
import PlaylistPage from "./PlaylistPage.jsx";

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
        <QueuePage
          currentArtist={props.currentArtist}
          current={props.current}
          setCurrent={props.setCurrent}
          allSongs={props.allSongs}
          FavouritesAdd={props.FavouritesAdd}
          FavouritesRemove={props.FavouritesRemove}
          favouriteTracks={props.favouriteTracks}
          ChangeActiveList={props.ChangeActiveList}
          AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
          activeList={props.activeList}
          immediateFollowingTracks={props.immediateFollowingTracks}
          HandleActionPopup={props.HandleActionPopup}
          activeIndex={props.activeIndex}
          currentPlaylist={props.currentPlaylist}
        />
      </div>
    )
  } else if (props.show === "favourites") {
    return (
      <div id={props.id}>
        <FavouritesPage
          currentArtist={props.currentArtist}
          current={props.current}
          setCurrent={props.setCurrent}
          allSongs={props.allSongs}
          FavouritesAdd={props.FavouritesAdd}
          FavouritesRemove={props.FavouritesRemove}
          favouriteTracks={props.favouriteTracks}
          ChangeActiveList={props.ChangeActiveList}
          AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
          HandleActionPopup={props.HandleActionPopup}
        >
        </FavouritesPage>
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
          ChangeActiveList={props.ChangeActiveList}
          AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
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
          HandleActionPopup={props.HandleActionPopup}
          ChangeActiveList={props.ChangeActiveList}
          AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
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
          ChangeActiveList={props.ChangeActiveList}
          AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
          HandleActionPopup={props.HandleActionPopup}
        />
      </div>
    )
  } else if (props.show === "playlists") {
    return (
      <div id={props.id}>
        <PlaylistPage
          currentGenre={props.currentGenre}
          current={props.current}
          setCurrent={props.setCurrent}
          allSongs={props.allSongs}
          FavouritesAdd={props.FavouritesAdd}
          FavouritesRemove={props.FavouritesRemove}
          favouriteTracks={props.favouriteTracks}
          ChangeActiveList={props.ChangeActiveList}
          AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
          HandleActionPopup={props.HandleActionPopup}

          playlists={props.playlists}
          setPlaylists={props.setPlaylists}
          currentPlaylist={props.currentPlaylist}
        />
      </div>
    )
  }
}

export default MainSection;