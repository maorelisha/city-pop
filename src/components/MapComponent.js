import React, { Component } from "react";
import { db } from "./Firebase";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import ReactImageMagnify from "react-image-magnify";
import "../css/mapComp.css";

class MapComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    notes: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  componentWillMount() {
    db.ref("CityPopSERVER/Notes").on("value", notes => {
      notes = Object.values(notes.val());
      console.log(notes);
      console.log(this.props.city);
      this.setState({
        ...this.state,
        notes: notes.filter(
          note =>
            note.fullAddress.includes(this.props.city) && note.status !== "done"
        )
      });
    });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  getMarkers() {
    const markers = [];
    this.state.notes.forEach(note => {
      markers.push(
        <Marker
          onClick={this.onMarkerClick}
          address={note.fullAddress}
          title={note.subject}
          img={note.imageUrl}
          key={note.noteUid}
          position={{ lat: note.latitude, lng: note.longtitude }}
          icon={
            note.status == "treat"
              ? {
                  url:
                    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png"
                }
              : undefined
          }
        />
      );
    });
    return markers;
  }

  render() {
    return (
      <Map
        onClick={this.onMapClicked}
        google={this.props.google}
        initialCenter={{
          lat: 31.771959,
          lng: 35.217018
        }}
        zoom={10}
      >
        {this.getMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h4>{this.state.selectedPlace.title}</h4>
            <h6>{this.state.selectedPlace.address}</h6>
            <ReactImageMagnify
              {...{
                smallImage: {
                  src: this.state.selectedPlace.img,
                  isFluidWidth: true
                },
                largeImage: {
                  src: this.state.selectedPlace.img,
                  width: 200,
                  height: 200
                }
              }}
            />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBUgpiNkpLGPdN8m43cbNmr9aV_81OZfL0"
})(MapComponent);
