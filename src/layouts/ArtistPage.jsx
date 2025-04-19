import {Typography} from "@mui/material";
import * as React from "react";
import PrintList from "../components/PrintList.jsx";

function ArtistPage(props) {
  return (
    <div>
      <Typography variant="h1">{props.currentArtist}</Typography>
      <PrintList
        allSongs={props.allSongs}
        whatToFilter={"artist"}
        filter={props.currentArtist}
        showArtist={false}
        showGenre={false}
        current={props.current}
        setCurrent={props.setCurrent}
      ></PrintList>
    </div>
  )
}

export default ArtistPage;
