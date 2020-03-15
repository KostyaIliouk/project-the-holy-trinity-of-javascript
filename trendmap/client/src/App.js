import React, { Component } from 'react'
import logo from './logo.svg'
import WorldMap from './Map'
import './App.css'
import './Map.css'
import './News.css'
import './Reddit.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorldMap/>
      </div>
    );
  }
}

export default App;
