import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Nav from "../components/Nav";
import MapComponent from "../components/MapComponent";
import AllReports from "./AllReports";
import ClosedReports from "./ClosedReports";
import TreatReports from "./TreatReports";
import OpenReports from "./OpenReports";
import "../css/appPage.css";

export default class AppPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
            <Nav handler={this.props.handler} />
            <Switch>
              <Route
                exact
                path="/"
                component={() => <MapComponent city={this.props.city} />}
              />
              <Route
                path="/AllReports"
                component={() => <AllReports city={this.props.city} />}
              />
              <Route path="/TreatReports" component={TreatReports} />
              <Route path="/OpenReports" component={OpenReports} />
              <Route path="/ClosedReports" component={ClosedReports} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
