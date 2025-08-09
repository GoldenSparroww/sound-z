import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Colors from '../global/Colors.js';

const TrackCard = (props) => {
  const CurrentColor = (props.current.id === props.track.id) ? Colors.color_details : Colors.color_text;

  const handleClick = (track) => {
    props.setCurrent(track);
    props.ChangeActiveList(0,[]);
  }

  return (
    <Card
      sx={{
        minWidth: "15rem",
        maxWidth: "15rem",
        height: "100%",
        display: 'flex',
        backgroundColor: Colors.color_footer,
      }}
    >
      <CardActionArea
        sx={{
          width: '100%',
          justifyContent: 'space-between',
        }}
        onClick={() => handleClick(props.track)}
      >
        <CardMedia
          component="img"
          width="100%"
          height="220rem"
          image={`http://localhost/music/images/${props.track.image}`}
          alt="Track image"
        />
        <CardContent >
          <Typography
            sx={{ color: CurrentColor }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.track.name}
          </Typography>
          <Typography
            sx={{ color: CurrentColor }}
            gutterBottom
            variant="body1"
            component="div"
          >
            {props.track.artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TrackCard;