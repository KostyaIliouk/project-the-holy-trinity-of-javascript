import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MediaCard from './MediaCard';
import upvote from '../media/upvote.svg';
import reddit_logo from '../media/redditicon.png';

import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedditAlien,  } from '@fortawesome/free-brands-svg-icons';
import { faNewspaper,  } from '@fortawesome/free-regular-svg-icons';


import '../styles/Content.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component={'div'}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  inner: {
  	flexGrow: 1,
  	minHeight: "100%",
  	maxHeight: "100%",
  	height: "100px",
  },
  panel: {
  	overflowY: "scroll",
  	height: "100%",
	backgroundColor: "rgb(70, 70, 70)",
	'& ::-webkit-scrollbar': {
		display: "none"
	}	
  }
}));

const StyledTabs = withStyles({
	root: {
		display: "flex",
		flex: 1,
		height: "100%",
		backgroundColor: "#323234",
	},
	scroller: {
		display: "flex",
	},
	flexContainerVertical: {
		width: "100%",
	},
	indicator: {
    	display: "none"
  	},
})(Tabs);

const StyledTab = withStyles(theme => ({
	root: {
		minWidth: "72px",
	  	width: "100%",
	  	flexGrow: 1,
	  	backgroundColor: "#323234"
	},
	wrapper: {
		color: "rgb(120, 120, 120)"
	},
	selected: {
		'& > .MuiTab-wrapper': {
			color: "white",
		}
	}
}))(Tab);

export default function Content(props) {

	const classes = useStyles();
	const [data, setData] = useState(props.data);
	useEffect( () => {setData(props.data)}, [props.data]);
	const [value, setValue] = useState((data.news == null) ? 1 : 0);
	

	

		

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const subtitle = (subreddit, upvotes) => {
		return <React.Fragment>r/{subreddit} - <img src={upvote} alt="Reddit-upvote" id="Reddit-upvote"/>{upvotes}</React.Fragment>
	}

	const createRedditCards = () => {
		let redditCards = [];
		let key = 0;
		let redditData = JSON.parse(data.reddit);
		if (redditData != null) {
			redditData.forEach(function(post) {
				let publishedAt = moment(post.publishedAt).format('DD MMM, YYYY');
				let image = (post.urlToImage == null) ? reddit_logo : post.urlToImage
				redditCards.push(<MediaCard title={post.title}
											subtitle={subtitle(post.subreddit, post.upvotes)}
						   					desc=""
				 							url={post.url}
				 							img={image}
				 							date={publishedAt} 
				 							key={key} />);
				key++;
			});
		}
		return redditCards;
	}

	const createNewsCards = () => {
		let newsCards = [];
		let key = 0;
		let newsData = JSON.parse(data.news);
		if (newsData != null) {
			newsData.forEach(function(post) {
				let publishedAt = moment(post.publishedAt).format('DD MMM, YYYY');
				newsCards.push(<MediaCard title={post.title}
											subtitle={post.source}
						   					desc={post.description}
				 							url={post.url}
				 							img={post.urlToImage}
				 							date={publishedAt} 
				 							key={key} />);
				 key++;
			});
		}
		return newsCards;
	};

	
	return (
		<Box width="100%"
			 height="100%"
			 display="flex">
			 <Grid container display="flex">
			 	<Grid item height={100} xs={10} display="flex">
			 		<Paper square elevation={2} className={classes.inner}>
				      <TabPanel height={100} value={value} index={0} className={classes.panel}>
				        {createNewsCards()};
				      </TabPanel>
				      <TabPanel value={value} index={1} className={classes.panel}>
				        {createRedditCards()};
			      	</TabPanel>
			      </Paper>
			 	</Grid>
			 	<Grid item height={100} xs={2} display="flex">
			 		<StyledTabs
				        value={value}
				        onChange={handleChange}
				        indicatorColor="primary"
				        textColor="primary"
				        aria-label="icon tabs example"
				        orientation="vertical"
				        variant="standard"
				      >
			      		<StyledTab icon={<FontAwesomeIcon icon={faNewspaper} size="2x" />}
			      				   {...a11yProps(0)} aria-label="news"
			      				   disabled={data.news == null} />
				      	<StyledTab icon={<FontAwesomeIcon icon={faRedditAlien} size="2x" />}
				      			   {...a11yProps(1)} aria-label="reddit" 
				      			   disabled={data.reddit == null} />
				      	
			      	</StyledTabs>
			 	</Grid>
			 </Grid>
		</Box>
		);
	
}