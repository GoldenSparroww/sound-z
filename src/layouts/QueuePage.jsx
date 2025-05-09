import {Typography} from "@mui/material";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {IsEmptyObject} from "../logic/TestInput.js";
import "../style/layout/QueueLayout.css"

const QueuePage = (props) => {
  return (
    <div id={"queue-container"}>
      <div id={"queue-header"}>
        <Typography variant="h1">Fronta</Typography>
      </div>

      <div id={"queue-current"}>
        {!IsEmptyObject(props.current) ? (
          <>
            <Typography variant="h6">Právě hraje:</Typography>
            <List>
              <ListItemButton
                sx={{height: 100}}
                selected={true}
              >
                <img
                  className={"img-in-list"}
                  src={`http://localhost/music/images/${props.current.image}`}
                  alt={props.current.image}
                ></img>
                <ListItemText
                  sx={{pl: 3}}
                  primary={props.current.name}
                  secondary={`${props.current.artist} • ${props.current.genre}`}
                ></ListItemText>
              </ListItemButton>
            </List>
          </>
        ) : (
          <Typography variant="h6">Nejdřív musíš něco zapnout hochu</Typography>
        )}
      </div>


      {props.immediateFollowingTracks.length > 0 && (
        <div id={"queue-following-tracks"}>
          <Typography variant="h6">Další ve frontě:</Typography>
          <List>
            {props.immediateFollowingTracks.map((track, i) => (
              <ListItemButton key={i}>
                <img
                  className={"img-in-list"}
                  src={`http://localhost/music/images/${track.image}`}
                  alt={track.image}
                ></img>
                <ListItemText sx={{pl: 3}}>
                  {track.name}
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </div>
      )}

      {(props.activeList.length > 0 && props.activeList.length - 1 > props.activeIndex) && (
        <div id={"queue-following-in-playlist"}>
          <Typography variant="h6">Další z aktuálního playlistu:</Typography>
          <List>
            {props.activeList
              .filter((track, i) => i > props.activeIndex)
              .map((track, i) => (
                <ListItemButton key={i}>
                  <img
                    className={"img-in-list"}
                    src={`http://localhost/music/images/${track.image}`}
                    alt={track.image}
                  ></img>
                  <ListItemText sx={{pl: 3}}>
                    {track.name}
                  </ListItemText>
                </ListItemButton>
              ))}
          </List>
        </div>
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