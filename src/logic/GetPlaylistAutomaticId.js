const GetPlaylistAutomaticId = (playlists) => {
  const idxs = playlists.map(playlist => playlist.id);
  let currentIdx = 0;
  while (idxs.includes(currentIdx)) {
    currentIdx++;
  }
  return currentIdx;
}

export default GetPlaylistAutomaticId;