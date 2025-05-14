import React from "react";
import Typography from "@mui/material/Typography";
import ThemeForm from "../global/ThemeForm.js";
import {ThemeProvider} from "@mui/material/styles";
import {Button} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const AboutTile = (props) => {
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
          <Typography variant={"h2"} > About sound-z </Typography>

          <Typography variant={"h4"} sx={{pt: "1.5rem"}} > EN </Typography>
          <Typography variant={"body1"}> This application was created as a school project for the UUR (Introduction to User Interfaces) course. </Typography>
          <Typography variant={"h5"} sx={{pt: "0.5rem"}}>Technologies/libraries used:</Typography>
          <Typography variant={"body1"}> React, Vite, PHP, Google MUI </Typography>
          <Typography variant={"h5"} sx={{pt: "0.5rem"}}> Author: </Typography>
          <Typography variant={"body1"}> Jan Kopačka </Typography>
          <Typography variant={"body1"}> A24B0346P </Typography>

          <Typography variant={"h4"} sx={{pt: "1.5rem"}} > CZ </Typography>
          <Typography variant={"body1"}> Tato aplikace byla vytvořena jako školní projekt na předmět UUR (úvod do uživatelských rozhraní). </Typography>
          <Typography variant={"h5"} sx={{pt: "0.5rem"}}>Použité technologie/knihovny:</Typography>
          <Typography variant={"body1"}> React, Vite, PHP, Google MUI </Typography>
          <Typography variant={"h5"} sx={{pt: "0.5rem"}}> Autor: </Typography>
          <Typography variant={"body1"}> Jan Kopačka </Typography>
          <Typography variant={"body1"}> A24B0346P </Typography>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", pt: "2rem" }}>
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

export default AboutTile;