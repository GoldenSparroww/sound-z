import {Box} from "@mui/material";

function AudioPlayer(props) {
  const PlayNext = () => {
    if (props.queueTracksMap.includes("immediateItem")) {
      props.setCurrent(props.immediateFollowingTracks[0].url);
      props.setImmediateFollowingTracks(props.immediateFollowingTracks.slice(1));
      console.log("a");
    }
    else if (props.queueTracksMap.includes("acitveListItem")) {
      if (props.activeIndex + 1 <= props.activeList.length - 1 ) {
        props.setCurrent(props.activeList[props.activeIndex + 1].url);
        props.setActiveIndex(props.activeIndex + 1);
        console.log("b1");
      } else {
        props.setCurrent(null);
        console.log("b2");
      }
    } else {
      props.setCurrent(null);
      console.log("c");
    }
  }

  return (
    <>
      {props.current && (
        <Box>
          <audio
            key={props.current}
            controls
            autoPlay
            src={props.current}
            style={{ width: "100%" }}
            onEnded={PlayNext}
          />
        </Box>
      )}
    </>
  )
}

export default AudioPlayer;