import {IconButton} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Typography from "@mui/material/Typography";
import formatTime from "../logic/FormatTime.js";
import React from "react";
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Colors from "../global/Colors.js";

const AudioPlayerControls = (props) => {
  return (
    <>
      <div id={"audio-controls"}>
        <IconButton sx={{backgroundColor:"transparent"}}>
          <ShuffleIcon
            sx={{color: props.randomPlay ? Colors.color_details : Colors.color_background}}
            onClick={() => props.HandleRandomPlay(!props.randomPlay)}
          />
        </IconButton>
        <IconButton>
          <KeyboardDoubleArrowLeftIcon onClick={props.PlayPrev} />
        </IconButton>
        <IconButton sx={{ height: '4rem', width: '4rem' }} onClick={props.togglePlay}>
          {props.isPlaying ? (
            <PauseIcon sx={{ height: '3.5rem', width: '3.5rem' }} />
          ) : (
            <PlayArrowIcon sx={{ height: '3.5rem', width: '3.5rem' }} />
          )}
        </IconButton>
        <IconButton>
          <KeyboardDoubleArrowRightIcon onClick={() => props.PlayNext(false)} />
        </IconButton>
        <IconButton sx={{backgroundColor:"transparent"}}>
          <RepeatIcon
            sx={{color: props.loop ? Colors.color_details : Colors.color_background}}
            onClick={() => props.setLoop(!props.loop)}
          />
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