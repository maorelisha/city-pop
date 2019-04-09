import React, { Component } from "react";
import "./css/App.css";
import Login from "./pages/Login";
import AppPage from "./pages/AppPage";
import Cookies from "js-cookie";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn:
        !!Cookies.get("loggedIn") && Cookies.get("loggedIn") === "yes"
          ? true
          : false,
      city: !!Cookies.get("userCity") ? Cookies.get("userCity") : "111"
    };
  }

  handleLoginClick(user) {
    Cookies.set("userCity", user.city);
    Cookies.set("loggedIn", "yes");
    this.setState({
      isLoggedIn: true,
      city: user.city
    });
  }

  handleLogoutClick() {
    Cookies.remove("loggedIn");
    Cookies.remove("userCity");
    this.setState({ city: "111", isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    console.log(isLoggedIn);
    return isLoggedIn ? (
      <AppPage handler={this.handleLogoutClick} city={this.state.city} />
    ) : (
      <Login handler={this.handleLoginClick} />
    );
  }
}

export default App;
