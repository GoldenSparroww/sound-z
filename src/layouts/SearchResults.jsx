import {Box, Divider, List, ListItemButton, ListItemText, Typography} from "@mui/material";

function SearchResults(props) {
  return (
    <>
      <Box>
        {props.searchedResults.tracks.length > 0 && (
          <>
            <Typography variant="h6">🎵 Skladby</Typography>
            <List>
              {props.searchedResults.tracks.map((song, idx) => (
                <ListItemButton key={idx} onClick={() => props.setCurrent(song.url)}>
                  <ListItemText primary={song.name} secondary={`${song.artist} • ${song.genre}`} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {props.searchedResults.genres.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">🎧 Žánry</Typography>
            <List>
              {props.searchedResults.genres.map((genre, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => alert(`Zobrazit skladby pro žánr: ${genre}`)}
                >
                  <ListItemText primary={genre} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {props.searchedResults.artists.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">🎤 Autoři</Typography>
            <List>
              {props.searchedResults.artists.map((artist, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => alert(`Zobrazit skladby pro autora: ${artist}`)}
                >
                  <ListItemText primary={artist} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>
    </>
  )
}

export default SearchResults;