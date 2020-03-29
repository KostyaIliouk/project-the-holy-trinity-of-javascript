import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import socketIOClient from "socket.io-client";

import WorldMap from './components/Map'
import Content from './components/Content';
import './styles/App.css'
import './styles/Map.css'

class App extends Component {

	constructor() {
		super();
		this.mapOnClick = this.mapOnClick.bind(this);
		this.mapOnLoad = this.mapOnLoad.bind(this);
		this.state = {
			data: {
				reddit: null,
				news: null,
			}
		};
		this.socket = socketIOClient('/');
	}

	mapOnLoad(data) {
    this.setState({
			data: {
				reddit: data[0].data,
				news: data[1].data,
			}
		});
	}

	mapOnClick(data) {
		this.setState({
			data: {
				reddit: data[0].data,
				news: data[1].data,
			}
		});
	}

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
				          <WorldMap lat="43.6532" lng="-79.3832"
				          			 onClick={this.mapOnClick}
												 onLoad={this.mapOnLoad}
												 socket={this.socket}
				          />
				        </Grid>
				        <Grid height={100} item xs className="content">
				          <Content key={this.state.data} data={this.state.data} />
				        </Grid>
			        </Grid>
		        </Box>
		        <Paper square className="nav" style={{ backgroundColor: "#323234", color: "white" }} elevation={4}>
		        	<Typography variant="h1" component={'div'} className="app-title">TrendMap</Typography>
		        	<Box className="filler" flexGrow={2}/>
	        		<Typography variant="h1" component={'div'} className="nav-item nav-link">
	        				<a href="localhost:3000">Credits</a>
	        		</Typography>
	        		<Divider orientation="vertical" flexItem/>
	        		<Typography variant="h1" component={'div'} className="nav-item nav-link">
	        			<a href="https://github.com/UTSCC09/project-the-holy-trinity-of-javascript/issues"
	        			   target="_blank"
	        			   rel="noopener noreferrer">
	        			   Report Issue <ErrorOutlineIcon />
	        			</a>
	        		</Typography>
				</Paper>
	        </Box>
			);
	}

}

export default App;
