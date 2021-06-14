import React from "react";
import { connect } from "react-redux";
import { getProfile } from "../selectors/Profile";
import { setProfile } from "../actions/Profile";
import { browserHistory } from "react-router";
import { Link } from "react-router";
import btoa from "btoa";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameValue: props.username,
      passwordValue: props.password,
      firstNameValue: props.firstName,
      lastNameValue: props.lastName,
      isRegisteredValue: props.isRegistered,
      message: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameInputChange = this.onUsernameInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onFirstNameInputChange = this.onFirstNameInputChange.bind(this);
    this.onLastNameInputChange = this.onLastNameInputChange.bind(this);

  }

  onUsernameInputChange = (e) => {
    const usernameValue = e.target.value;
    this.setState({
      usernameValue,
    });
  };

  onPasswordInputChange = (e) => {
    const passwordValue = e.target.value;
    this.setState({
      passwordValue,
    });
  };

  onFirstNameInputChange = (e) => {
    const firstNameValue = e.target.value;
    this.setState({
      firstNameValue,
    });
  };

  onLastNameInputChange = (e) => {
    const lastNameValue = e.target.value;
    this.setState({
      lastNameValue,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.usernameValue 
      || !this.state.passwordValue
      || !this.state.firstNameValue
      || !this.state.lastNameValue) {
      this.setState({
        message: "All fields are required",
      });
      return;
    }

    const isLoginAction = this.state.isRegisteredValue === true;

    const userId = !this.props.userId
      ? btoa(this.state.usernameValue)
      : this.props.userId;

    this.props.setProfile({
      username: this.state.usernameValue,
      password: this.state.passwordValue,
      firstName: this.state.firstNameValue,
      lastName: this.state.lastNameValue,
      isRegistered: true,
      isLoggedIn: isLoginAction,
      userId,
    });

    browserHistory.push("/");

    //TODO: Identify and consecutive event
  };

  render() {
    return (
      <div className="view-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <form onSubmit={this.handleSubmit}>

                  {!this.state.isRegisteredValue && (
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={this.state.firstNameValue}
                          onChange={this.onFirstNameInputChange}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={this.state.lastNameValue}
                          onChange={this.onLastNameInputChange}
                        />
                      </div>
                    </div>
                  )}

                  
                  {!this.state.isLoggedIn && (
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.usernameValue}
                          onChange={this.onUsernameInputChange}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={this.onPasswordInputChange}
                        />
                      </div>
                    </div>
                  )}
                  
                  {!this.state.isLoggedInValue && (
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <button className="btn btn-primary">
                          <span>
                            {this.state.isRegisteredValue
                              ? "Login"
                              : "Register"}
                          </span>
                        </button>
                        <span> {this.state.message}</span>
                      </div>
                    </div>
                  )}

                </form>
                <Link className="btn btn-default" to="/">
                  <span className="glyphicon glyphicon-circle-arrow-left" />
                  <span> Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => getProfile(state);

const mapDispatchToProps = (dispatch) => ({
  setProfile: (id) => dispatch(setProfile(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
