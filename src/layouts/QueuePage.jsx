import {Typography} from "@mui/material";
import * as React from "react";

const QueuePage = (props) => {
  return (
    <div>
      <Typography variant="h1">Fronta</Typography>
      <Typography variant="h6">Prave hraje - {props.current.name}</Typography>

      {props.immediateFollowingTracks.length > 0 && (
        <>
          <Typography variant="h6">Dalsi ve fronte</Typography>
          {props.immediateFollowingTracks.map((track, i) => (
            <p key={i}>{track.name}</p>
          ))}
        </>
      )}

      {(props.activeList.length > 0 && props.activeList.length - 1 > props.activeIndex) && (
        <>
          <Typography variant="h6">Dalsi v playlistu ??????</Typography>
          {props.activeList
            .filter((track, i) => i > props.activeIndex)
            .map((track, i) => (
            <p key={i}>{track.name}</p>
          ))}
        </>
      )}


      {/*<PrintList
        allSongs={[...props.immediateFollowingTracks, ...props.activeList]}
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
      ></PrintList>*/}
    </div>
  )
}

export default QueuePage;