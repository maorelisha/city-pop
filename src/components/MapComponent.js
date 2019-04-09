import React, { Component } from "react";
import { db } from "./Firebase";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import ReactImageMagnify from "react-image-magnify";
import "../css/mapComp.css";
import detective from "../icons/detective.png";
import ImageZoom from "react-medium-image-zoom";

class MapComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    notes: [],
    inspectors: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  componentDidMount() {
    db.ref("CityPopSERVER/Notes").on("value", notes => {
      notes = Object.values(notes.val());
      this.setState({
        ...this.state,
        notes: notes.filter(
          note =>
            this.props.city &&
            note.fullAddress.includes(this.props.city) &&
            note.status !== "done"
        )
      });
    });
  }

  componentWillMount() {
    db.ref("CityPopSERVER/Notes").on("value", notes => {
      notes = Object.values(notes.val());

      this.setState({
        ...this.state
      });
    });

    db.ref("CityPopSERVER/inspector").on("value", inspectors => {
      inspectors = Object.values(inspectors.val());
      this.setState({
        ...this.state,
        inspectors: inspectors.filter(
          inspector =>
            this.props.city && inspector.city.includes(this.props.city)
        )
      });
    });
  }

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
            note.status === "treat"
              ? {
                  url:
                    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png"
                }
              : undefined
          }
          zIndex={note.status === "treat" ? 99999999 : undefined}
        />
      );
    });

    return markers;
  }

  getInspectors() {
    const inspectors = [];
    this.state.inspectors.forEach(inspector => {
      inspectors.push(
        <Marker
          onClick={this.onMarkerClick}
          address={inspector.fullAddress}
          name={inspector.Inspector_Name}
          key={inspector.Inspector_Name}
          time={inspector.time}
          position={{ lat: inspector.latitude, lng: inspector.longtitude }}
          icon={detective}
        />
      );
    });
    return inspectors;
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

  render() {
    return (
      <Map
        onClick={this.onMapClicked}
        google={this.props.google}
        initialCenter={{
          lat: 32.01578078,
          lng: 34.77309091
        }}
        zoom={12}
        className="map"
      >
        {this.getMarkers()}
        {this.getInspectors()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <h4>
            {this.state.selectedPlace.title
              ? this.state.selectedPlace.title
              : this.state.selectedPlace.name}
          </h4>
          <h6>{this.state.selectedPlace.address}</h6>

          <ReactImageMagnify
            {...{
              smallImage: {
                src: this.state.selectedPlace.img || "",
                isFluidWidth: true
              },
              largeImage: {
                src: this.state.selectedPlace.img || "",
                width: 200,
                height: 200
              }
            }}
          />
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBUgpiNkpLGPdN8m43cbNmr9aV_81OZfL0"
})(MapComponent);
