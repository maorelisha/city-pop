import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
    this.updateUserValue = this.updateUserValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.users = [
      { user: "maor", password: "123456" },
      { user: "daniel", password: "test" }
    ];
    this.state = {
      user: "",
      password: ""
    };
  }

  checkLogin() {
    this.users.forEach(currUser => {
      if (
        currUser.user == this.state.user &&
        currUser.password == this.state.password
      ) {
        this.props.handler(currUser);
      }
    });
  }

  updateUserValue(e) {
    this.setState({
      ...this.state,
      user: e.target.value
    });
  }

  updatePasswordValue(e) {
    this.setState({
      ...this.state,
      password: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <input
            type="text"
            name="user"
            id="user"
            onChange={this.updateUserValue}
          />
          <input
            type="text"
            name="password"
            id="password"
            onChange={this.updatePasswordValue}
          />
          <button onClick={this.checkLogin}>Login</button>
        </div>
      </div>
    );
  }
}
