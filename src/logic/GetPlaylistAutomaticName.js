const GetPlaylistAutomaticName = (playlists) => {
  const usedNumbers = new Set();

  playlists.forEach((playlist) => {
    const match = playlist.name.match(/^New playlist n\. (\d+)$/);
    if (match) {
      usedNumbers.add(parseInt(match[1], 10));
    }
  });

  let newNumber = 1;
  while (usedNumbers.has(newNumber)) {
    newNumber++;
  }

  return `New playlist n. ${newNumber}`;
}

export default GetPlaylistAutomaticName;