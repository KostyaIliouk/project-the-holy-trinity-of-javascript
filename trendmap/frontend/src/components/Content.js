import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MediaCard from './MediaCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedditAlien,  } from '@fortawesome/free-brands-svg-icons';
import { faNewspaper,  } from '@fortawesome/free-regular-svg-icons';


import '../styles/Content.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
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

const useStyles = makeStyles({
  tab: {
  	minWidth: "72px",
  	flexGrow: 1,
  	borderBottom: "1px solid red",
  	borderLeft: "1px solid red",
  },
  inner: {
  	flexGrow: 1,
  	minHeight: "100%",
  	maxHeight: "100%",
  	overflowY: "scroll",
  	height: "100px",
  	borderLeft: "1px solid red",
  },
  panel: {
  	overflowY: "scroll",
  	height: "100%"
  }
});

const StyledTabs = withStyles({
	root: {
		display: "flex",
		flex: 1,
		height: "100%",
	},
	scroller: {
		display: "flex",
	}
})(Tabs);

export default function Content() {



	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

		return (
			<Box width="100%"
				 height="100%"
				 display="flex">
				 <Grid container display="flex">
				 	<Grid item height={100} xs={10} display="flex">
				 		<Paper square elevation={2} className={classes.inner}>
					      <TabPanel height={100} value={value} index={0} className={classes.panel}>
					        
					        <MediaCard />
					        <MediaCard />

					      </TabPanel>
					      <TabPanel value={value} index={1} className={classes.panel}>
					        
					        <MediaCard />
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
				      		<Tab icon={<FontAwesomeIcon icon={faNewspaper} />} className={classes.tab} {...a11yProps(0)} aria-label="reddit" />
					      	<Tab icon={<FontAwesomeIcon icon={faRedditAlien} />} className={classes.tab} {...a11yProps(1)} aria-label="news" />
					      	
				      	</StyledTabs>
				 	</Grid>
				 </Grid>
			</Box>
			);
}