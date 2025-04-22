import {Typography} from "@mui/material";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

const QueuePage = (props) => {
  return (
    <div>
      <Typography variant="h1">Fronta</Typography>
      <Typography variant="h6">Právě hraje:</Typography>
      <List>
        <ListItemButton
          sx={{height: 100}}
          selected={true}
        >
          <img
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

      {props.immediateFollowingTracks.length > 0 && (
        <>
          <Typography variant="h6">Další ve frontě:</Typography>
          <List>
            {props.immediateFollowingTracks.map((track, i) => (
              <ListItemButton key={i}>
                <img
                  src={`http://localhost/music/images/${track.image}`}
                  alt={track.image}
                ></img>
                {track.name}
              </ListItemButton>
            ))}
          </List>
        </>
      )}

      {(props.activeList.length > 0 && props.activeList.length - 1 > props.activeIndex) && (
        <>
          <Typography variant="h6">Další v playlistu ______:</Typography>
          <List>
            {props.activeList
              .filter((track, i) => i > props.activeIndex)
              .map((track, i) => (
                <ListItemButton key={i}>
                  <img
                    src={`http://localhost/music/images/${track.image}`}
                    alt={track.image}
                  ></img>
                  {track.name}
                </ListItemButton>
              ))}
          </List>
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