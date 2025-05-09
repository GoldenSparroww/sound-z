import {Box, Button, IconButton, Typography} from "@mui/material";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {IsEmptyObject} from "../logic/TestInput.js";
import "../style/layout/QueueLayout.css"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Colors from "../global/Colors.js";
import {ThemeProvider} from "@mui/material/styles";
import themeForm from "../global/ThemeForm.js";

const QueuePage = (props) => {
  return (
    <div id={"queue-container"}>
      <div id={"queue-header"}>

        <Typography variant="h1">
          Fronta
        </Typography>
      </div>

      <div id={"queue-body"}>
        <div id={"queue-current"}>
          {!IsEmptyObject(props.current) ? (
            <>
              <Typography variant="h6">Právě hraje:</Typography>
              <List>
                <ListItemButton
                  sx={{
                    height: 100,
                    cursor: "default"
                  }}
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
            <Typography
              variant="h6"
              sx={{pl: 3}}
            >
              Nejdřív musíš něco zapnout hochu
            </Typography>
          )}
        </div>


        {props.immediateFollowingTracks.length > 0 && (
          <div id={"queue-following-tracks"}>
            <Typography variant="h6">Další ve frontě:</Typography>
            <List>
              {props.immediateFollowingTracks.map((track, i) => (
                <ListItemButton
                  key={i}
                  sx={{
                    cursor: "default",
                    '&:active': {
                      backgroundColor: Colors.color_hover,
                    },
                  }}
                >
                  <img
                    className={"img-in-list"}
                    src={`http://localhost/music/images/${track.image}`}
                    alt={track.image}
                  ></img>
                  <ListItemText sx={{pl: 3}}>
                    {track.name}
                  </ListItemText>
                  <IconButton
                    sx={{ color: Colors.color_details }}
                    onClick={(e) => {
                      e.stopPropagation();
                      props.setImmediateFollowingTracks(
                        [...props.immediateFollowingTracks.filter((song, idxFilter) => (
                          idxFilter !== i
                        ))],
                      );
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </ListItemButton>
              ))}
            </List>
          </div>
        )}

        {(props.activeList.length > 0 && props.activeList.length - 1 > props.activeIndex) && (
          <div id={"queue-following-in-playlist"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Další z aktuálního playlistu:</Typography>
              <ThemeProvider theme={themeForm}>
                <Button
                  onClick={() => {
                    props.ChangeActiveList(0, []);
                  }}
                >
                  <HighlightOffIcon sx={{ color: Colors.color_details, pr: "0.5rem" }} />
                  Odstranit playlist z fronty
                </Button>
              </ThemeProvider>
            </Box>
            <List>
              {props.activeList
                .filter((track, i) => i > props.activeIndex)
                .map((track, i) => (
                  <ListItemButton
                    key={i}
                    sx={{
                      cursor: "default",
                      '&:active': {
                        backgroundColor: Colors.color_hover,
                      },
                    }}
                  >
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
    </div>
  )
}

export default QueuePage;