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
import formatTime from "../logic/FormatTime.js";

const QueuePage = (props) => {
  return (
    <div id={"queue-container"}>
      <div id={"queue-header"}>

        <Typography variant="h1">
          Queue
        </Typography>
      </div>

      <div id={"queue-body"}>
        <div id={"queue-current"}>
          {!IsEmptyObject(props.current) ? (
            <>
              <Typography variant="h5">Currently playing:</Typography>
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
                  >
                  </ListItemText>
                  <Typography >
                    {formatTime(props.current.duration)}
                  </Typography>
                </ListItemButton>
              </List>
            </>
          ) : (
            <Typography
              variant="h6"
            >
              Queue is empty.
            </Typography>
          )}
        </div>


        {props.immediateFollowingTracks.length > 0 && (
          <div id={"queue-following-tracks"}>
            <Typography variant="h5">Next in queue:</Typography>
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
                  <ListItemText sx={{pl: 3}}
                    secondary={track.genre}
                  >
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
                  <Typography sx={{pl: "5%"}} >
                    {formatTime(track.duration)}
                  </Typography>
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
              <Typography variant="h5">Next from current playlist:</Typography>
              <ThemeProvider theme={themeForm}>
                <Button
                  onClick={() => {
                    props.ChangeActiveList(0, []);
                  }}
                >
                  <HighlightOffIcon sx={{ color: Colors.color_details, pr: "0.5rem" }} />
                  Remove playlist from the queue
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
                    <ListItemText sx={{pl: 3}}
                      secondary={track.genre}
                    >
                      {track.name}
                    </ListItemText>
                    <Typography sx={{pl: "5%"}} >
                      {formatTime(track.duration)}
                    </Typography>
                  </ListItemButton>
                ))}
            </List>
          </div>
        )}
      </div>
    </div>
  )
}

export default QueuePage;