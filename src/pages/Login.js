import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import "../css/login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
    this.updateUserValue = this.updateUserValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.users = [
      { user: "maor", password: "123456", city: "חולון" },
      { user: "daniel", password: "test", city: "ראשון לציון" }
    ];
    this.state = {
      user: "",
      password: "",
      incPass: false
    };
  }

  checkLogin() {
    this.users.forEach(currUser => {
      if (
        currUser.user === this.state.user &&
        currUser.password === this.state.password
      ) {
        this.props.handler(currUser);
        return;
      }
    });
    this.setState({
      ...this.state,
      incPass: true
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
    const IncPass = () => {
      if (this.state.incPass) {
        return <p>incorrect user or password!</p>;
      }
      return null;
    };
    return (
      <div className="main">
        <div className="wrapper">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6" className="offset-3">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardHeader className="form-header purple-gradient rounded">
                      <h3 className="my-3">
                        <MDBIcon icon="lock" /> CityPop Login:
                      </h3>
                    </MDBCardHeader>
                    <form>
                      <div className="grey-text">
                        <MDBInput
                          label="Type your user"
                          icon="user"
                          group
                          type="text"
                          validate
                          onChange={this.updateUserValue}
                        />
                        <MDBInput
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          onChange={this.updatePasswordValue}
                        />
                      </div>
                      <IncPass />
                      <div className="text-center mt-4">
                        <MDBBtn
                          color="blue"
                          className="mb-3"
                          onClick={this.checkLogin}
                          type="submit"
                        >
                          Login
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
