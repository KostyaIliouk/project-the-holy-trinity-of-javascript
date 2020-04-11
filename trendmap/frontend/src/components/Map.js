import React, { createRef, Component } from 'react';
import { Map, TileLayer, Popup, GeoJSON } from 'react-leaflet';

import countryData from '../countryData.json'

function getColor(continent) {
    return continent === "Africa" ? '#1c684b' :
           continent === "Europe" ? '#8a1d1d' :
           continent === "North America" ? '#2a1c68' :
           continent === "South America" ? '#681c41' :
           continent === "Asia" ? '#1c5268' :
           continent === "Oceania" ? '#68381c' :
           continent === "Antarctica" ? '#fff' :
                                         '#4575b4';
}


export default class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.lat,
      lng: props.lng,
      zoom: 4,
      minZoom: 2,
      maxZoom: 6,
      onLoad: props.onLoad,
      onClick: props.onClick,
    };
    this.resetHighlight = this.resetHighlight.bind(this);
    this.clickFeature = this.clickFeature.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.style = this.style.bind(this);
    this.mapRef = createRef();
    this.geoRef = createRef();
    this.socket = props.socket;
    this.clickedCountry = "";
    this.clickedCountryCode = "";
  }

  componentDidMount() {
    this.socket.emit('global');
    const onClick = this.state.onClick;
    this.socket.on('fetchedData', function(data) {
      if (data[0] === 200) {
        onClick(data[1]);
      } else {
        onClick([]);
      }
    });
  }

  highlightFeature(e) {
    if (this.clickedCountry !== e.target) {
      const layer = e.target;
      layer.setStyle({
        weight: 4,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.6
      });
      layer.bringToFront();
    }
  }

  resetHighlight(e) {
    if (this.clickedCountry !== e.target) {
      const geo = this.geoRef.current.leafletElement;
      geo.resetStyle(e.target);
      if (this.clickedCountry) {
        this.clickedCountry.bringToFront();
      }
    }
  }

  clickFeature(e, countryCode) {
    const map = this.mapRef.current.leafletElement;
    if (this.clickedCountry) {
      this.clickedCountry.setStyle(this.style);
    }
    this.clickedCountry = e.target;
    this.clickedCountryCode = countryCode;
    map.fitBounds(e.target.getBounds());
    e.target.setStyle({
      fillColor: '#666',
      weight: 4,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.6
    });
    this.socket.emit('fetch', countryCode);
  }

  onEachFeature(feature, layer) {
    layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: (e) => this.clickFeature(e, feature.properties.ISO_A2)
    });
  }

  style(feature) {
    if (this.clickedCountryCode !== feature.properties.ISO_A2) {
      return {
        fillColor: getColor(feature.properties.CONTINENT),
        weight: 1,
        opacity: 1,
        color: '#fff',
        dashArray: '3',
        fillOpacity: 0.6
      };
    }
  }

  render() {
    // <NewsList data={this.state.news}/>
    // <RedditList data={this.state.reddit}/>
    const position = [this.state.lat, this.state.lng];
    const mapStyle = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=";
    const mapUrl = mapStyle + process.env.REACT_APP_LEAFLET_ACCESS_TOKEN;

    return (
        <>
          <Map
            center={position}
            zoom={this.state.zoom}
            ref={this.mapRef}
            zoomSnap={0.5}
            zoomDelta={0.5}
            minZoom={this.state.minZoom}
            maxZoom={this.state.maxZoom}
            maxBoundsViscosity={1.0}
            className="Map"
            maxBounds={[
                [-90, -180],
                [90, 180]
              ]}
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