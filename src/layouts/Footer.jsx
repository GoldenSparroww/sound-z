import React, {useEffect, useRef, useState} from "react";
import "../style/layout/FooterLayout.css"
import {IconButton} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {ThemeProvider} from "@mui/material/styles";
import ThemeAudioControls from "../global/ThemeAudioControls.js";
import {IsEmptyObject} from "../logic/TestInput.js";
import formatTime from "../logic/FormatTime.js";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function Footer(props) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // 1 = 100%

  const PlayNext = () => {
    if (props.queueTracksMap.includes("immediateItem")) {
      props.setCurrent(props.immediateFollowingTracks[0]);
      props.setImmediateFollowingTracks(props.immediateFollowingTracks.slice(1));
    }
    else if (props.queueTracksMap.includes("acitveListItem")) {
      if (props.activeIndex + 1 <= props.activeList.length - 1 ) {
        props.setCurrent(props.activeList[props.activeIndex + 1]);
        props.setActiveIndex(props.activeIndex + 1);
      } else {
        props.setCurrent({});
      }
    } else {
      props.setCurrent({});
    }
  }

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // tato podminka resi problem s bufferem po nastaveni src u audio na "", kde si audio ele. stale pamatoval
    // svuj posledni src
    if (IsEmptyObject(props.current)) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    //událost se spouští pravidelně během přehrávání
    audio.addEventListener("timeupdate", updateProgress);
    //událost se spouští, když jsou načtena metadata audia
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [props.current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const HandleProgressBarChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = e.target.value;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      // asynchronni
      // ChatGPT: Ten error Uncaught (in promise) AbortError: The play() request was interrupted by a call to pause()
      // je známý a znamená, že se audio.play() volá, ale mezitím proběhne audio.pause() nebo jiný zásah do přehrávání,
      // než se play() stihne dokončit – typicky po konci skladby nebo při rychlém kliknutí na play/pause.
      audio.play().catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Nepodařilo se přehrát audio:', error);
        }
      });
    } else {
      audio.pause();
    }
  };

  const HandleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };


  return (
    <div id={props.id}>
        <audio
          autoPlay
          ref={audioRef}
          src={props.current ? props.current.url : ''}
          style={{ width: "100%" }}
          onEnded={PlayNext}
          controlsList="nodownload"
        />

      <ThemeProvider theme={ThemeAudioControls}>
        <div id={"audio-container"}>

          <div id={"currently-playing-track"}>
            {!IsEmptyObject(props.current) ? (
              <>
                <img
                style={{ width: "6rem", height: "6rem", objectFit: "cover", borderRadius: "4px" }}
                src={`http://localhost/music/images/${props.current.image}`}
                />
                <ListItemText
                  id={"currently-playing-track-text"}
                  primary={props.current.name}
                  secondary={props.current.artist}
                ></ListItemText>
              </>
            ) : <div style={{ width: "6rem", height: "6rem"}}></div>}
          </div>

          <div id={"audio-controls-container"}>
            <div id={"audio-controls"}>
              <IconButton>
                <KeyboardDoubleArrowLeftIcon/>
              </IconButton>
              <IconButton sx={{ height: '4rem', width: '4rem' }} onClick={togglePlay}>
                {isPlaying ? (
                  <PauseIcon sx={{ height: '3.5rem', width: '3.5rem' }} />
                ) : (
                  <PlayArrowIcon sx={{ height: '3.5rem', width: '3.5rem' }} />
                )}
              </IconButton>
              <IconButton>
                <KeyboardDoubleArrowRightIcon onClick={PlayNext} />
              </IconButton>
            </div>

            <div id={"progress-bar-container"}>
              <Typography variant={"body1"}>{formatTime(progress)}</Typography>
              <input
                id={"audio-progress-bar"}
                value={progress || 0}
                min={0}
                max={duration || 0}
                type="range"
                onChange={HandleProgressBarChange}
                style={{
                  background: duration
                    ? `linear-gradient(to right, var(--color-details) 0%, var(--color-details) ${progress / duration * 100}%, var(--color-empty-field) ${progress / duration * 100}%, var(--color-empty-field) 100%)`
                    : `linear-gradient(to right, var(--color-empty-field) 0%, var(--color-empty-field) 100%)`
                }}
              />
              <Typography variant={"body1"}>{formatTime(duration)}</Typography>
            </div>
          </div>
          <div id={"sound-progress-bar"}>
            <VolumeUpIcon />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={HandleVolumeChange}
              id="volume-slider"
              style={{
                background: `linear-gradient(to right, var(--color-details) 0%, var(--color-details) ${volume * 100}%, var(--color-empty-field) ${volume * 100}%, var(--color-empty-field) 100%)`
              }}
            />
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Footer;