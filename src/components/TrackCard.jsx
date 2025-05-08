import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Colors from '../global/Colors.js';

const TrackCard = (props) => {
  return (
    <Card
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        height: "100%",
        display: 'flex',
        backgroundColor: Colors.color_footer
      }}
    >
      <CardActionArea
        sx={{
          width: '100%',
          justifyContent: 'space-between',
        }}
        onClick={() => {props.setCurrent(props.track)}}
      >
        <CardMedia
          component="img"
          width="100%"

          image={`http://localhost/music/images/${props.track.image}`}
          alt="Track image"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {props.track.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {props.track.artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TrackCard;