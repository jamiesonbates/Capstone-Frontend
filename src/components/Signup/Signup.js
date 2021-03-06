import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupNewUser } from '../../actions/signupAction';

import Nav from '../Nav/Nav';

import './signup.css';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      error: null
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (username.length > 15) {
      this.setState({
        error: 'Username must be less than 15 characters.'
      });

      return;
    }

    if (password.length < 8) {
      this.setState({
        error: 'Password must be longer than 8 characters.'
      });

      return;
    }

    if (!email) {
      this.setState({
        error: 'Email must not be blank.'
      })
    }

    if (!email.includes('@')) {
      this.setState({
        error: 'Must use valid email.'
      })

      return;
    }

    this.props.dispatch(signupNewUser(username, email, password));
    this.refs.signupForm.reset();
  }

  render() {
    return (
      <div className="Signup-container">
        <Nav {...this.props} />

        <div className="Signup-form-container">
          <form onSubmit={this.handleSubmit.bind(this)} ref="signupForm" className="Signup-form">
            <h2>Sign Up</h2>
            <div className="Signup-input-container">
              <input type="text" ref="username" placeholder="Username"/>
            </div>

            <div className="Signup-input-container">
              <input type="text" ref="email" placeholder="Email"/>
            </div>

            <div className="Signup-input-container">
              <input type="password" ref="password" placeholder="Password"/>
            </div>

            {
              this.state.error || this.props.signUpError ?
                <div className="Signup-error">
                  <p>{this.state.error || this.props.signUpError}</p>
                </div>
              :
                null
            }

            <button
              type="submit"
              className="Signup-btn">
              Start
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    isAuthenticated: store.user.isAuthenticated,
    signUpError: store.user.signUpError
  }
}

export default connect(mapStateToProps)(Signup);
