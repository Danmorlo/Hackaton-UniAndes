import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "google-map-react"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 5.071492,  
      lng: -74.053508
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '90%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBE8nufLowA328E3T3uSP7Y8LBzoAPwdMM" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={5.071492}
            lng={-74.053508}
            text="Mi finca"
          />
          
        </GoogleMapReact>
        
      </div>
    );
  }
}

export default SimpleMap;