import {IconButton} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Typography from "@mui/material/Typography";
import formatTime from "../logic/FormatTime.js";
import React from "react";

function AudioPlayerControls(props) {
  return (
    <>
      <div id={"audio-controls"}>
        <IconButton>
          <KeyboardDoubleArrowLeftIcon/>
        </IconButton>
        <IconButton sx={{ height: '4rem', width: '4rem' }} onClick={props.togglePlay}>
          {props.isPlaying ? (
            <PauseIcon sx={{ height: '3.5rem', width: '3.5rem' }} />
          ) : (
            <PlayArrowIcon sx={{ height: '3.5rem', width: '3.5rem' }} />
          )}
        </IconButton>
        <IconButton>
          <KeyboardDoubleArrowRightIcon onClick={props.PlayNext} />
        </IconButton>
      </div>

      <div id={"progress-bar-container"}>
        <Typography variant={"body1"}>{formatTime(props.progress)}</Typography>
        <input
          id={"audio-progress-bar"}
          value={props.progress || 0}
          min={0}
          max={props.duration || 0}
          type="range"
          onChange={props.HandleProgressBarChange}
          style={{
            background: props.duration
              ? `linear-gradient(to right, var(--color-details) 0%, var(--color-details) ${props.progress / props.duration * 100}%, var(--color-empty-field) ${props.progress / props.duration * 100}%, var(--color-empty-field) 100%)`
              : `linear-gradient(to right, var(--color-empty-field) 0%, var(--color-empty-field) 100%)`
          }}
        />
        <Typography variant={"body1"}>{formatTime(props.duration)}</Typography>
      </div>
    </>
  )
}

export default AudioPlayerControls;