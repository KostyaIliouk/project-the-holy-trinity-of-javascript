import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment'


export const Reddit = props => {
  const publishedAt = moment(props.publishedAt).format('DD MMM, YYYY');
  const subreddit = "r/" + props.subreddit
  const subtitle = subreddit + " - " + props.upvote
  return (
    <div className="Reddit">
      <Card style={{ width: '20vw' }}>
        <Card.Img variant="top" src={props.urlToImage}/>
        <Card.Body>
          <Card.Title><a href={props.url}>{props.title}</a></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text><small class="text-muted">{publishedAt}</small></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reddit;
