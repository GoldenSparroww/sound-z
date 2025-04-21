import {Typography} from "@mui/material";
import PrintList from "../components/PrintList.jsx";
import * as React from "react";

const FavouritesPage = (props) => {
  return (
    <div>
      <Typography variant="h1">Oblíbené</Typography>
      <PrintList
        allSongs={props.favouriteTracks}
        whatToFilter={null}
        filter={null}
        showArtist={true}
        showGenre={true}
        current={props.current}
        setCurrent={props.setCurrent}
        FavouritesAdd={props.FavouritesAdd}
        FavouritesRemove={props.FavouritesRemove}
        favouriteTracks={props.favouriteTracks}
        ChangeActiveList={props.ChangeActiveList}
        AddImmediateFollowingTracks={props.AddImmediateFollowingTracks}
        HandleActionPopup={props.HandleActionPopup}
      ></PrintList>
    </div>
  )
}

export default FavouritesPage;