import React from "react";
import Typography from "@mui/material/Typography";
import ThemeForm from "../global/ThemeForm.js";
import {ThemeProvider} from "@mui/material/styles";
import {Button} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const HelpTile = (props) => {
  return (
    <>
      <div
        id={'popup-menu-background'}
        onClick={() => props.setShownPopupMenu(null)}>
      </div>

      <div
        id={'popup-menu-content'}
        className={'mui-like-border'}
      >
        <ThemeProvider theme={ThemeForm}>
          <Typography variant={"h2"} > Help </Typography>

          <Typography variant={"h5"} sx={{pt: "0.5rem"}}>1. Getting started</Typography>
          <Typography variant={"body1"}> In order to find or play any music, you first need to search for it. </Typography>
          <Typography variant={"body1"}> Navigation bar contains search field, type anything you want to search here. </Typography>
          <Typography variant={"h5"} sx={{pt: "0.5rem"}}>2. Searched results</Typography>
          <Typography variant={"body1"}> Upon searching something, in main section you will see the results. </Typography>
          <Typography variant={"body1"}> Results are divided into 3 categories: "Tracks, Genres, Artists". </Typography>
          <Typography variant={"body1"}> Tracks are playable, genre and author items will direct you to their pages. </Typography>
          <Typography variant={"body1"}> Every searched or somehow shown track has several options. </Typography>
          <Typography variant={"body1"}> You can play it, add to the queue, playlist or favourites. </Typography>
          <Typography variant={"h5"} sx={{pt: "0.5rem"}}>3. Queue</Typography>
          <Typography variant={"body1"}> When you click on any song, it will start playing immediately. </Typography>
          <Typography variant={"body1"}> If your song was selected within any wider content (e.g. playlist), the rest of the songs will be added to the queue. </Typography>
          <Typography variant={"body1"}> Clicking on song from different space, will replace remaining playlist in the queue.</Typography>
          <Typography variant={"body1"}> Songs added manually to the queue, wont be deleted until played or removed manually. </Typography>
          <Typography variant={"h5"} sx={{pt: "0.5rem"}}>4. Controls</Typography>
          <Typography variant={"body1"}> Red buttons in the footer, allow you to play/pause, skip songs. </Typography>
          <Typography variant={"body1"}> Including volume settings or moving with the music itself. </Typography>
          <Typography variant={"h5"} sx={{pt: "0.5rem"}}>5. Playlists</Typography>
          <Typography variant={"body1"}> You can create your own playlists and customize them. </Typography>
          <Typography variant={"body1"}> You are allowed to have at maximum 50 playlists at once. </Typography>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "2rem" }}>
            <Button
              variant="filled"
              startIcon={<CancelIcon />}
              onClick={() => props.setShownPopupMenu(null)}
              sx={{ width: '120px' }}
            >
              Exit
            </Button>
          </div>
        </ThemeProvider>
      </div>
    </>
  )
}

export default HelpTile;