import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt,  } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    backgroundColor: "rgb(240, 240, 240)",
    margin: "5%",
  },
  media: {
    height: 264
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  const handleClick = () => {
    window.open(`${props.url}`, "_blank");
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          className={classes.media}
          image={props.img}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.pos} component={'div'} color="textSecondary">
            {props.subtitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component={'div'}>
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="button" component={'div'} >
          {props.date}
        </Typography>
        <Button size="medium" color="primary">
          <a href={props.url} target="_blank" rel="noopener noreferrer" >Learn More <FontAwesomeIcon icon={faExternalLinkAlt} /></a>
        </Button>
      </CardActions>
    </Card>
  );
}
