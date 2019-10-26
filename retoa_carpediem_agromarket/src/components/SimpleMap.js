import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import finca from "../resources/farm.png"
import city from "../resources/city.png"

const AnyReactComponent = () => {return (<img src={finca} style={{width:"40px"}}></img>)};
const AnyReactComponent2 = () => {return (<img src={city} style={{width:"40px"}}></img>)};

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 5.071492,  
      lng: -74.053508
    },
    zoom: 10
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
          <AnyReactComponent
            lat={5.071492}
            lng={-74.053508}
            text="Mi finca"
          />
           <AnyReactComponent2
            lat={4.870250 }
            lng={-74.052035}
            text="Mi finca"
          />
          
        </GoogleMapReact>
        
      </div>
    );
  }
}

export default SimpleMap;