import {Box} from "@mui/material";

function AudioPlayer(props) {
  return (
    <>
      {props.current && (
        <Box>
          <audio controls autoPlay src={props.current} style={{ width: "100%" }} />
        </Box>
      )}
    </>
  )
}

export default AudioPlayer;