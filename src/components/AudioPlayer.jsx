function AudioPlayer(props) {
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

  const IsEmptyObject = (obj) => {
    return (Object.keys(obj).length === 0);
  }

  return (
    <>
      {!IsEmptyObject(props.current) && (
        <audio
          controls
          autoPlay
          src={props.current.url}
          style={{ width: "100%" }}
          onEnded={PlayNext}
        />
      )}
    </>
  )
}

export default AudioPlayer;