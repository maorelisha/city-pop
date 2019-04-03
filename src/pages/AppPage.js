import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import Nav from "../components/Nav";

export default class AppPage extends Component {
  render() {
    return (
      <div>
        <div>
          <BrowserRouter>
            <div className="App">
              <Nav />
              <MapComponent />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
