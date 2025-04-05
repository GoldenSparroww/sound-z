import * as React from 'react';
//import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import Colors from '../global/colors.js'


export default function NestedList(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [selectedSubIndex, setSelectedSubIndex] = React.useState(-1);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index, section) => {
    setSelectedIndex(index);
    if (section) {
      props.changeMainSection(section)
    }
  };

  const handleCombinedClick = (event, index) => {
    handleClick();
    handleListItemClick(event, index);
  };

  return (
    <List
      sx={{
        padding: '0',
        width: '100%',
        height: '100%',
        margin: "0",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0, "homepage")}
      >
        <ListItemIcon>
          <HomeIcon sx={{ fontSize: '3rem', padding: "0 1rem 0 0" }}/>
        </ListItemIcon>
        <ListItemText primary="Home Page"/>
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1, "queue")}
      >
        <ListItemIcon>
          <LayersIcon sx={{ fontSize: '3rem', padding: "0 1rem 0 0" }}/>
        </ListItemIcon>
        <ListItemText primary="Queue"/>
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2, "favourites")}
      >
        <ListItemIcon>
          <FavoriteIcon sx={{ fontSize: '3rem', padding: "0 1rem 0 0" }} />
        </ListItemIcon>
        <ListItemText primary="Favorites"/>
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleCombinedClick(event, 3)}
      >
        <ListItemIcon>
          <QueueMusicIcon sx={{ fontSize: '3rem', padding: "0 1rem 0 0" }}/>
        </ListItemIcon>
        <ListItemText primary="Playlists"/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{
          maxHeight: '300px',
          bgcolor: Colors.color_side_bar_list,
          overflowY: 'auto',
          padding: 0,
        }} component="div" disablePadding>

          <ListItemButton
            sx={{pl: 6}}
            selected={selectedSubIndex === 0}
            onClick={() => setSelectedSubIndex(0)}
          >
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Add a New Playlist"/>
          </ListItemButton>

          <ListItemButton
            sx={{pl: 6}}
            selected={selectedSubIndex === 1}
            onClick={() => setSelectedSubIndex(1)}
          >
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Goofy"/>
          </ListItemButton>

          <ListItemButton
            sx={{pl: 6}}
            selected={selectedSubIndex === 2}
            onClick={() => setSelectedSubIndex(2)}
          >
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Goofy"/>
          </ListItemButton>

          <ListItemButton
            sx={{pl: 6}}
            selected={selectedSubIndex === 3}
            onClick={() => setSelectedSubIndex(3)}
          >
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Goofy"/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
