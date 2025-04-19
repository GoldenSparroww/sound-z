import {ListItem, Typography} from "@mui/material";
import {List, ListItemButton, ListItemText} from "@mui/material";

function AuthorPage(props) {
  return (
    <div>
      <List>
        <Typography variant="h1">{props.currentAuthor}</Typography>
          {props.allSongs
            .filter(song => song.artist === props.currentAuthor)
            .map((song, idx) => (
              <ListItemButton key={idx}>{song.name}</ListItemButton>
            ))}
      </List>
    </div>
  )
}

export default AuthorPage;
