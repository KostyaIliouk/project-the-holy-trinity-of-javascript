import React from 'react';
import Reddit from './Reddit.js'


const RedditList = props => {
  var redditList = (
    <div className="Reddit-empty"/>
  );
  if (props.data.length !== 0) {
    redditList = props.data.map((arg, index) =>
      <Reddit title={arg.title}
        key={index}
        url={arg.url}
        subreddit={arg.subreddit}
        description={arg.description}
        urlToImage={arg.urlToImage}
        publishedAt={arg.publishedAt}
        upvotes={arg.upvotes}/>
    );
  }
  return (
    <div className="Reddit-list">
      {redditList}
    </div>
  );
};

export default RedditList;
