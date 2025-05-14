import {IsEmptyObject} from "../logic/TestInput.js";

function AudioPlayer(props) {
  return (
    <>
      {/*!IsEmptyObject(props.current) && (
        <audio
          controls
          autoPlay
          src={props.current.url}
          style={{ width: "100%" }}
          onEnded={props.PlayNext}
        />
      )*/}
    </>
  )
}

export default AudioPlayer;