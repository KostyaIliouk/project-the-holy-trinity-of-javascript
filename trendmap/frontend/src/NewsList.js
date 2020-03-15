import React from 'react';
import News from './News.js'


const NewsList = props => {
  var newsList = (
    <div className="News-empty"/>
  );
  if (props.data.length !== 0) {
    newsList = props.data.map((arg, index) =>
      <News title={arg.title}
        key={index}
        url={arg.url}
        source={arg.source}
        description={arg.description}
        urlToImage={arg.urlToImage}
        publishedAt={arg.publishedAt}/>
    );
  }
  return (
    <div className="News-list">
      {newsList}
    </div>
  );
};

export default NewsList;
