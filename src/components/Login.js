import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import '../css/Login.css'

class Login extends Component {
  state = {
    user: '',
  }

  handleLogin = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(setAuthedUser(this.state.user))
    this.props.history.push('/')
  }

  handleChange = (e) => {
    e.persist()
    this.setState(() => ({ user: e.target.value }))
  }

  render() {
    const { users } = this.props
    return (
      <div className="login">
        <div className="login-container">
          <div className="login-container-header">
            <h1>Welcome to the Would You Rather App!</h1>
            <p>Please, sign in to continue</p>
          </div>
          <div className="login-container-content">
            <div className="login-container-logo">
              <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="" />
            </div>
            <h2>Sign in</h2>
            <form onSubmit={this.handleLogin}>
              <select onChange={this.handleChange} value={this.state.user}>
                <option value="">Select user</option>
                {Object.keys(users).map((userId) => (
                  <option key={userId} value={userId}>
                    {users[userId].name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="submit-button"
                disabled={this.state.user === ''}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Login))
