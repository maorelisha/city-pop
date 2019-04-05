import React, { Component } from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.handler();
  }

  render() {
    return (
      <div className="nav">
        <Menu>
          <Link to="/" className="menu-item">
            All reports
          </Link>
          <Link to="/" className="menu-item">
            Open reports
          </Link>
          <Link to="/" className="menu-item">
            In Treat
          </Link>
          <Link to="/" className="menu-item">
            Closed reports
          </Link>
        </Menu>
        <Link to="/" className="brand">
          CityPop
        </Link>

        <button className="log-out-btn" onClick={this.logOut}>
          <i class="fas fa-sign-out-alt" /> {""}Sign Out
        </button>
      </div>
    );
  }
}
