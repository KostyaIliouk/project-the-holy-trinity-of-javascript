import React from 'react';
import News from './News.js'


const NewsList = props => {
  const newsList = props.data.map(arg => <News title={arg.title} />);
  return (
    <div>
      {newsList}
    </div>
  );
};

export default NewsList;
