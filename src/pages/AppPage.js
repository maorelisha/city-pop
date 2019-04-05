import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import Nav from "../components/Nav";

export default class AppPage extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props.city);
  }
  render() {
    return (
      <div>
        <div>
          <BrowserRouter>
            <div className="App">
              <Nav handler={this.props.handler} />
              <MapComponent city={this.props.city} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
