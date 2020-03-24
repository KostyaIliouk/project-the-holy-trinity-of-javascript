import React, { createRef, Component } from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import NewsList from './NewsList.js'
import RedditList from './RedditList.js'

import countryData from './countryData.json'


export default class WorldMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 3,
      minZoom: 2,
      news: [],
      reddit: []
    };
    this.resetHighlight = this.resetHighlight.bind(this);
    this.clickFeature = this.clickFeature.bind(this);
    this.mapRef = createRef();
    this.geoRef = createRef();
  }

  componentDidMount() {
    fetch(`/reddit/global`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then(response => {
          this.setState({reddit: response});
      });
  }

  highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#3182bd',
        dashArray: '',
        fillOpacity: 0.6
    });
  }

  resetHighlight(e) {
    const geo = this.geoRef.current.leafletElement;
    geo.resetStyle(e.target);
  }

  clickFeature(e, countryCode) {
    const map = this.mapRef.current.leafletElement;
    map.fitBounds(e.target.getBounds());
    fetch(`/newsapi/getHeadlines/?country=${countryCode.toLowerCase()}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then(response => {
          this.setState({news: response});
      });
    fetch(`/reddit/national/?country=${countryCode.toLowerCase()}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then(response => {
          this.setState({reddit: response});
      });
  }

  onEachFeature(feature, layer) {
    layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: (e) => this.clickFeature(e, feature.properties.iso_a2)
    });
  }

  style(feature) {
    return {
        weight: 0.1,
        color: 'white',
        opacity: 1
    };
  }

  render() {
    // <NewsList data={this.state.news}/>
    // <RedditList data={this.state.reddit}/>
    const position = [this.state.lat, this.state.lng];
    const mapStyle = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token="
    const mapUrl = mapStyle + process.env.REACT_APP_LEAFLET_ACCESS_TOKEN;
    return (
        <>
          <Map
            center={position}
            zoom={this.state.zoom}
            ref={this.mapRef}
            minZoom={this.minZoom}
            className="Map"
            >
            <TileLayer
              url={mapUrl}
              id='mapbox/outdoors-v11'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              tileSize={512}
              zoomOffset={-1}
            />
            <GeoJSON
              ref={this.geoRef}
              data={countryData}
              style={this.style}
              onEachFeature={(feature, layer) => this.onEachFeature(feature, layer)}
            />
          </Map>
      </>
    );
  }
}