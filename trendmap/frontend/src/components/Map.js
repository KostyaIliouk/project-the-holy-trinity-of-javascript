import React, { createRef, Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

import countryData from '../countryData.json'

function getColor(continent) {
    return continent === "Africa" ? '#7fbc41' :
           continent === "Europe" ? '#d73027' :
           continent === "North America" ? '#fdae61' :
           continent === "South America" ? '#f1b6da' :
           continent === "Asia" ? '#fee090' :
           continent === "Oceania" ? '#bf812d' :
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
    this.mapRef = createRef();
    this.geoRef = createRef();
  }

  componentDidMount() {
    fetch(`/api/global`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then(response => {
          this.state.onLoad(response);
      });
      
  }

  highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#666',
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
    fetch(`/api/fetch?country=${countryCode.toLowerCase()}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then(response => {
          this.state.onClick(response);
      });
  }

  onEachFeature(feature, layer) {
    layer.on({
        mouseover: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: (e) => this.clickFeature(e, feature.properties.ISO_A2)
    });
  }

  style(feature) {
    return {
        fillColor: getColor(feature.properties.CONTINENT),
        weight: 0.1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.6
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