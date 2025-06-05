function GetSearchedResults(source, filter, songNameEnable = true, songArtistEnable = true, songGenreEnable = true) {

  const tracks = source
    .filter(song => {
      const nameMatches = songNameEnable && song.name.toLowerCase().includes(filter);
      const artistMatches = songArtistEnable && song.artist.toLowerCase().includes(filter);
      const genreMatches = songGenreEnable && song.genre.toLowerCase().includes(filter);

      return nameMatches || artistMatches || genreMatches;
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