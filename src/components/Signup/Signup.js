import React, { Component } from "react";
//validator brings in middleware that has methods we can use to verify data
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator";
//brings in the css that renders onto the DOM
import "./Signup.css";

//gives access to this file as a component
export class Signup extends Component {

  //creates a pre-formated state for data manipulation
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    onConfirmPasswordFocus: false,
    isButtonDisabled: true,
  };

//handles changes made to the input values of all input fields
  handleOnChange = (event) => {
    //updates the state with the values added to input fields on the DOM
    this.setState(
      {
        //creates a dynamic state to update the state
        [event.target.name]: event.target.value,
      },
      () => {
        //all if statements checks the target by the stated name of the state and calls the function to handle the data if target equals the state we are looking for
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }
        if (event.target.name === "email") {
          this.handleEmailInput();
        }
        if (event.target.name === "username") {
          this.handleUsernameInput();
        }
        if (event.target.name === "password") {
          this.handlePasswordInput();
        }
        if (event.target.name === "confirmPassword") {
          if (this.state.password !== this.state.confirmPassword) {
            this.setState({
              confirmPasswordError: "Password does not match!",
            });
          } else {
            this.setState({
              confirmPasswordError: "",
            });
          }
        }
      }
    );
  };

 
  handlePasswordInput = () => {
     //checks the password input and confirmation password are the same
    if (this.state.onConfirmPasswordFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Password does not match",
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }
    //checks the password input field to see if it is empty or not
    if (this.state.password.length === 0) {
      this.setState({
        passwordError: "Password cannot be empty",
      });
    } else {
      //uses the validator method to see if the password is strong enough
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          passwordError:
            "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long",
        });
      }
    }
  };

  
  handleEmailInput = () => {
    //checks if the email input is empty and if not 
    if (this.state.email.length === 0) {
      this.setState({
        emailError: "Email cannot be empty",
      });
    } else {
      //uses validator method to check if the provided email is legitimate
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        this.setState({
          emailError: "Please, enter a valid email!",
        });
      }
    }
  };


  handleFirstNameAndLastNameInput = (event) => {
    //checks if the input fields is empty
    if (this.state[event.target.name].length > 0) {
      //uses validator method to check if first and last name are letters
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };


  handleUsernameInput = () => {
    //checks if the input field is empty
    if (this.state.username.length === 0) {
      this.setState({
        usernameError: "Username cannot be empty",
      });
    } else {
      //uses validator method to check if username is alphanumeric
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: "",
        });
      } else {
        this.setState({
          usernameError: "Username can only have alphabet and number",
        });
      }
    }
  };

  handleOnSubmit = (event) => {
    //prevents the DOM from refreshing
    event.preventDefault();
    console.log(this.state);
  };

    //checks if input field is left empty and user clicks outside the box sends error message
  handleOnBlur = (event) => {
  
    console.log(event.target.name);
    console.log("handle onBlur Triggered");
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };


  //checks if confirm password on focus in state is true or false and toggles 
  handleConfirmPasswordOnFocus = () => {
    if (!this.state.onConfirmPasswordFocus) {
      this.setState({
        onConfirmPasswordFocus: true,
      });
    }
  };


  render() {

    //destructured access to current state with naming convention needed to match current state
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    //elements displayed on the DOM to get access to all the functions written above based on the name and input values we target.  cannot comment below without errors in the jsx
    return (
      <div className="container">
        <div className="form-text">Sign up</div>
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError}
                </div>
              </div>
              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  name="email"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.handleOnChange}
                  name="username"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  name="password"
                  onBlur={this.handleOnBlur}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleOnChange}
                  name="confirmPassword"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleConfirmPasswordOnFocus}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Signup;