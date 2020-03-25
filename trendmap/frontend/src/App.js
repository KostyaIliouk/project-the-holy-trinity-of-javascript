import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import WorldMap from './Map'
import Content from './components/Content';
import './App.css'
import './Map.css'
import './News.css'
import './Reddit.css'

/*

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorldMap/>
      </div>
    );
  }
}
*/



class App extends Component {

	render() {
		return (
			<Box display="flex"
				 flexDirection="column"
				 width="100%"
				 flexGrow={1}
				 overflow="hidden"
				 >
				<Box width="100%" flexGrow={1} display="flex">
					<Grid container>
						<Grid item xs={8} className="map">
				          <WorldMap/>
				        </Grid>
				        <Grid height={100} item xs className="content">
				          <Content />
				        </Grid>
			        </Grid>
		        </Box>
		        <Paper square className="nav" style={{ backgroundColor: "#323234", color: "white" }} elevation={4}>
		        	<Typography variant="h1" className="app-title">TrendMap</Typography>
		        	<Box className="filler" flexGrow={2}/>
	        		<Typography variant="h1" className="nav-item">Credits</Typography>
	        		<Divider orientation="vertical" flexItem/>
	        		<Typography variant="h1" className="nav-item">Report Issue <ErrorOutlineIcon /></Typography>
				</Paper>
	        </Box>
			);
	}

}

export default App;
