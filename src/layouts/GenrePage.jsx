import {Typography} from "@mui/material";
import * as React from "react";
import PrintList from "../components/PrintList.jsx";

function GenrePage(props) {
  return (
    <div>
      <Typography variant="h1">{props.currentGenre}</Typography>
      <PrintList
        allSongs={props.allSongs}
        whatToFilter={"genre"}
        filter={props.currentGenre}
        showArtist={true}
        showGenre={false}
        current={props.current}
        setCurrent={props.setCurrent}
      ></PrintList>
    </div>
  )
}

export default GenrePage;