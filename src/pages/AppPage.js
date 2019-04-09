import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Nav from "../components/Nav";
import MapComponent from "../components/MapComponent";
import AllReports from "./AllReports";

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
                component={() => (
                  <AllReports city={this.props.city} status="all" />
                )}
              />
              <Route
                path="/TreatReports"
                component={() => (
                  <AllReports city={this.props.city} status="treat" />
                )}
              />
              <Route
                path="/OpenReports"
                component={() => (
                  <AllReports city={this.props.city} status="open" />
                )}
              />
              <Route
                path="/ClosedReports"
                component={() => (
                  <AllReports city={this.props.city} status="done" />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
