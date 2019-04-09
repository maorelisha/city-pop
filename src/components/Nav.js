import React, { Component } from "react";
import "../css/nav.css";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      menuOpen: false
    };
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  logOut() {
    this.props.handler();
  }

  render() {
    return (
      <div className="nav">
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
        >
          <Link to="/" className="menu-item" onClick={() => this.closeMenu()}>
            Map
          </Link>
          <Link
            to="/AllReports"
            className="menu-item"
            onClick={() => this.closeMenu()}
          >
            All reports
          </Link>
          <Link
            to="/OpenReports"
            className="menu-item"
            onClick={() => this.closeMenu()}
          >
            Open reports
          </Link>
          <Link
            to="/TreatReports"
            className="menu-item"
            onClick={() => this.closeMenu()}
          >
            In Treat
          </Link>
          <Link
            to="/ClosedReports"
            className="menu-item"
            onClick={() => this.closeMenu()}
          >
            Closed reports
          </Link>
        </Menu>
        <Link to="/" className="brand">
          CityPop
        </Link>

        <button className="log-out-btn" onClick={this.logOut}>
          <i className="fas fa-sign-out-alt" /> {""}Sign Out
        </button>
      </div>
    );
  }
}
