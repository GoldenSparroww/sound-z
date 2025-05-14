function GetSearchedResults(source, filter) {

  const tracks = source
    .filter(song => {
      return (
        song.name.toLowerCase().includes(filter) ||
        song.artist.toLowerCase().includes(filter) ||
        song.genre.toLowerCase().includes(filter)
      )
    });

  /* reduce((acc, song) - acc je prazdne pole, kam se budou vkladat jen unikatni hodnoty */

  const genres = source
    .filter(song => song.genre.toLowerCase().includes(filter))
    .reduce((acc, song) => {
      if (!acc.includes(song.genre)) acc.push(song.genre);
      return acc;
    }, []);

  const artists = source
    .filter(song => song.artist.toLowerCase().includes(filter))
    .reduce((acc, song) => {
      if (!acc.includes(song.artist)) acc.push(song.artist);
      return acc;
    }, []);

  return {tracks, genres, artists}
}

export default GetSearchedResults;