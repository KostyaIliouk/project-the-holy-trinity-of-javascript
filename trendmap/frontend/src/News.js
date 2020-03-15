import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment'


export const News = props => {
  const publishedAt = moment(props.publishedAt).format('DD MMM, YYYY');
  return (
    <div className="News">
      <Card style={{ width: '20vw' }}>
        <Card.Img variant="top" src={props.urlToImage}/>
        <Card.Body>
          <Card.Title><a href={props.url} target="_blank" rel="noopener noreferrer">{props.title}</a></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.source}</Card.Subtitle>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text><small className="text-muted">{publishedAt}</small></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default News;
