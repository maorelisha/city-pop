import React, { Component } from "react";
import "./css/App.css";
import Login from "./pages/Login";
import AppPage from "./pages/AppPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false, user: {} };
  }

  handleLoginClick(user) {
    this.setState({
      ...this.state,
      isLoggedIn: true,
      user
    });
  }

  handleLogoutClick() {
    this.setState({ ...this.state, isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    console.log(this.state.user.city);
    return isLoggedIn ? (
      <AppPage handler={this.handleLogoutClick} city={this.state.user.city} />
    ) : (
      <Login handler={this.handleLoginClick} />
    );
  }
}

export default App;
