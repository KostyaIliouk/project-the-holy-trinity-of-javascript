import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment'

import upvote from './media/upvote.svg';


export const Reddit = props => {
  const publishedAt = moment(props.publishedAt).format('DD MMM, YYYY');
  const subreddit = "r/" + props.subreddit
  return (
    <div className="Reddit">
      <Card style={{ width: '20vw' }}>
        <Card.Img variant="top" src={props.urlToImage}/>
        <Card.Body>
          <Card.Title><a href={props.url} target="_blank" rel="noopener noreferrer">{props.title}</a></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subreddit} - <img src={upvote} alt="Reddit-upvote" id="Reddit-upvote"/>{props.upvotes}</Card.Subtitle>
          <Card.Text><small className="text-muted">{publishedAt}</small></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reddit;
