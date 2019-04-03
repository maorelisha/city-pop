import React, { Component } from "react";
import { db } from "./Firebase";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

class MapComponent extends Component {
  state = {
    notes: []
  };

  componentWillMount() {
    db.ref("CityPopSERVER/Notes").on("value", notes => {
      notes = Object.values(notes.val());
      this.setState({
        ...this.state,
        notes
      });
    });
  }

  getMarkers() {
    const markers = [];
    this.state.notes.forEach(note => {
      markers.push(
        <Marker
          key={note.noteUid}
          position={{ lat: note.latitude, lng: note.longtitude }}
        />
      );
    });
    return markers;
  }

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: 31.771959,
          lng: 35.217018
        }}
        zoom={8}
      >
        {this.getMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBUgpiNkpLGPdN8m43cbNmr9aV_81OZfL0"
})(MapComponent);
