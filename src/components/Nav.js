import React, { Component } from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
export default class Nav extends Component {
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="nav">
        <Menu>
          <Link to="/" className="menu-item">
            Home
          </Link>
          <Link to="/" className="menu-item">
            About
          </Link>
          <Link to="/" className="menu-item">
            Contact
          </Link>
        </Menu>
        <Link to="/" className="brand">
          CityPop
        </Link>
      </div>
    );
  }
}
